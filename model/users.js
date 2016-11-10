'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new Schema({
  userEmail: String,
  encryptedPassword: String,
  role: [Number]
)}

export default = mongoose.model('users', userSchema)
