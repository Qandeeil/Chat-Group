const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const findVisible = require('../findVisible')

const chatSchema = new mongoose.Schema({
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channels'},
    chatChannel: {
        idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Registration'},
        chat: [String],
        date: {type: String}
    }
})

const population = [
    {
        path: 'channel'
    },
    {
        path: 'chatChannel'
    }
]

chatSchema.pre('find', findVisible(population))
chatSchema.plugin(deepPopulate, {})

const Chat = mongoose.model('Chat',chatSchema,'Chat')
module.exports = Chat