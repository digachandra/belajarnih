var express = require('express');
const UserController = require('../controllers/users')
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register.ejs', { title: 'Register Panel', message: req.flash('signupMessage') });
});

module.exports = router
