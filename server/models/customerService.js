const mongoose = require('mongoose')

const customerService = mongoose.Schema({
    name: String,
    phone: Number,
    sex: String,
    age: Number,
    password: {
        require: false,
        type: String,
    },
    role: Number
})

module.exports = mongoose.model(customerService)