'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userEmail: { type: String, unique: true},
  encryptedPassword: String,
  passwordResetToken: String,
  passwordResetExpires: Date
})

const Users = mongoose.model('users', userSchema)
module.exports = Users
