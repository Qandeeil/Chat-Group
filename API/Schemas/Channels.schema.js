const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const findVisible = require('../findVisible')

const channelsSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'Registration'},
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Registration'
    }]
})

const population = [
    {
        path: 'admin'
    },
    {
        path: 'users'
    }
]

channelsSchema.pre('find', findVisible(population))
channelsSchema.plugin(deepPopulate, {})

const Channels = mongoose.model('Channels',channelsSchema,'Channels')
module.exports = Channels