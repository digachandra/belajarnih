'use strict'
const mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');

const Schema = mongoose.Schema
const userSchema = new Schema({
  userEmail: { type: String, unique: true},
  encryptedPassword: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: [Number],
  test:String

})

// generating a hash
userSchema.methods.generateHash = function(encryptedPassword) {
    return bcrypt.hashSync(encryptedPassword, bcrypt.genSaltSync(8), null);
};

// checking if encryptedPassword is valid
userSchema.methods.validPassword = function(encryptedPassword) {
    return bcrypt.compareSync(encryptedPassword, this.encryptedPassword);
};


const Users = mongoose.model('users', userSchema)
module.exports = Users
