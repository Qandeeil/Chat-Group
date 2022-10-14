var express = require('express');
var router = express.Router();
const registration = require('../Schemas/Registration.schema')
/* GET users listing. */

router.get('/', async (req, res, next) => {
  const users = await registration.find();
  res.send(users)
});

router.post('/', async (req,res,next) => {
  const { email, password } = req.body
  const checkEmail = await registration.findOne({
    email
  })
  const checkUsername = await registration.findOne({ 
    username: email
  })
  if(checkEmail){
    const checkAccountEmail = await registration.findOne({
      email,
      password
    })
    if(checkAccountEmail){
      res.send({checkAccount: true, checkEmail: true, checkPassword: true, Data: {
        _id: checkAccountEmail._id
      }})
    }else{
      res.send({checkEmail: true, checkPassword: false, messagePassword: "The password you’ve entered is incorrect."})
    }
  }else if(checkUsername){
    const checkAccountUsername = await registration.findOne({
      username: email,
      password
    })
    if(checkAccountUsername){
      res.send({checkAccount: true, checkEmail: true, checkPassword: true, Data: {
        _id: checkAccountUsername._id
      }})
    }else{
      res.send({checkEmail: true, checkPassword: false, messagePassword: "The password you’ve entered is incorrect."})
    }
  }else{
    res.send({checkEmail: false, messageEmail: "The email or username you entered isn't connected to an account."})
  }
})

router.post('/checkResetPasswordAccount', async (req,res,next) => {
  const {email} = req.body
  const checkEmail = await registration.findOne({
    email
  })
  const checkUsername = await registration.findOne({
    username: email
  })
  if(checkEmail){
    res.send({checkVerification: true, _id: checkEmail._id})
  }else if(checkUsername){
    res.send({checkVerification: true, _id: checkUsername._id})
  }else{
    res.send({checkVerification: false})
  }
})

router.post('/Verification', async (req,res,next) => {
  const {_id,birthday} = req.body
  const checkData = await registration.findOne({
    _id,
    birthday
  })
  if(checkData){
    res.send({check: true})
  }else{
    res.send({check: false})
  }
})

router.put('/resetPassword', async (req,res,next) => {
  const {_id,password} = req.body
  const resetPassword = await registration.findByIdAndUpdate(_id,{
    password
  })
  res.send({change: true})
})

module.exports = router;
