const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    accounts: {
        type: [String],
        defaul: []
    },
})

mongoose.model('users', schema)