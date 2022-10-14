const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    birthday: {type: Date},
    gender: {type: String},
    phoneNumber: {type: String},
    email: {type: String},
    password: {type: String},
    profilePhoto: {type: String, default: 'https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png'},
    bio: {type: String}
})

const Registration = mongoose.model('Registration', registrationSchema, 'Registration')
module.exports = Registration