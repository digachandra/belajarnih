'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userEmail: { type: String, unique: true},
  encryptedPassword: String,
<<<<<<< HEAD
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: [Number]
=======
>>>>>>> 67de6ac723e10e0787cc97a69c4cda3ca405ebb1
})

const Users = mongoose.model('users', userSchema)
module.exports = Users
