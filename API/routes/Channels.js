var express = require('express');
var router = express.Router();
const channels = require('../Schemas/Channels.schema')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const getChannel = await channels.find();
  res.send(getChannel)
});

router.post('/', async (req,res,next) => {
  const {admin,name,description,users} = req.body
  const newChannel = await channels.create({
    admin,
    description,
    name,
    users
  })
  res.send(newChannel)
})

router.put('/join', async (req,res,next) => {
  const {_id,users} = req.body
  const joinChannel = await channels.findByIdAndUpdate(_id,{
    $push: {
      users: users
    }
  })
  res.send({join: true})
})

router.put('/leaving', async (req,res,next) => {
  const {_id,users} = req.body
  console.log(req.body)
  const leavingChannel = await channels.findByIdAndUpdate(_id,{
    $pullAll: {
      users
    }
  })
  res.send({leaving: true})
})

module.exports = router;
