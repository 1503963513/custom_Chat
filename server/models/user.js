const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    phone: Number,
    password: Number,
    sex: String,
    agree: {
        default: false,
        type: Boolean,
    },
    role: Number
})

module.exports = mongoose.model('user', userSchema)