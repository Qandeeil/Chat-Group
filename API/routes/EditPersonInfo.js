var express = require('express');
var router = express.Router();
const registration = require('../Schemas/Registration.schema')
const multer = require('multer')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './profilePhoto')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().getSeconds() + file.originalname)
  }
})

const uploads = multer({
  storage
}).single('profilePicture')

router.put('/', uploads, async (req,res,next) => {
  const url = req.protocol + "://" + req.get("host");
  if(req.file){
    const {
      _id,
      name,
      username,
      phoneNumber,
      email,
      password,
      profilePhoto = url + '/editInfo/' + req.file.filename,
      bio
    } = req.body
    const changeData = await registration.findByIdAndUpdate(_id,{
      name,
      username,
      phoneNumber,
      email,
      password,
      profilePhoto,
      bio
    })
    if(changeData){
      res.send({update: true})
    }else{
      res.send({update: false})
    }
  }else{
    const {
      _id,
      name,
      username,
      phoneNumber,
      email,
      password,
      bio
    } = req.body
    const changeData = await registration.findByIdAndUpdate(_id,{
      name,
      username,
      phoneNumber,
      email,
      password,
      bio
    })
    if(changeData){
      res.send({update: true})
    }else{
      res.send({update: false})
    }
  }
})

module.exports = router;
