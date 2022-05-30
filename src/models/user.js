const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const User = model("user", userSchema)

module.exports = User