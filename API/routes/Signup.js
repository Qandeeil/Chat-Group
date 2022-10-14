var express = require('express');
var router = express.Router();
const registration = require('../Schemas/Registration.schema')
/* GET users listing. */

router.get('/', async (req, res, next) => {
  const getUsers = await registration.find();
  res.send(getUsers)
});

router.post('/', async (req,res,next) => {
  const {
    name,
    username,
    birthday,
    gender,
    email,
    password
  } = req.body
  const checkUsername = await registration.findOne({
    username
  })
  const checkEmail = await registration.findOne({
    email
  })
  if(checkUsername){
    res.send({checkUsername: true, message: 'Username already exists'})
  }else if(checkEmail){
    res.send({checkEmail: true, message: 'Email already exists'})
  }else{
    const newSignup = await registration.create({
      name,
      username,
      birthday,
      gender,
      email,
      password
    })
    res.send({created: true})
  }
})

module.exports = router;
