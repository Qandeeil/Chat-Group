var express = require('express');
var router = express.Router();
const chat = require('../Schemas/Chat.Schema')
const multer = require('multer')

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const getChat = await chat.find();
    res.send(getChat);
});

router.post('/', async (req,res,next) => {
  const {channel,chatChannel} = req.body
  const newChat = await chat.create({
      channel,
      chatChannel
  })
  res.send({send: true})
})

module.exports = router;
