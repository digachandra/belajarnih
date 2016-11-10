'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userEmail: String,
  encryptedPassword: String,
  role: [Number]
})

const Users = mongoose.model('users', userSchema)
module.exports = Users
