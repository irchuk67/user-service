const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    middleName: {
        type: String,
        required: false
    },
    birthDate: Date,
    sex: String,
    phoneNumber: String,
    email: String,
    password: String,
    other:{
        type: [Object],
        required: false
    }
}, {collection: 'User', versionKey: false})

module.exports = mongoose.model('User', UserSchema)