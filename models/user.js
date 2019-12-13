const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    token: String,
    balance: Number,
    version: { type: "Number", default: 0 },
    currency: String
})

module.exports = mongoose.model("User", UserSchema)