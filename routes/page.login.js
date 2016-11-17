var express = require('express');
const UserController = require('../controllers/users')
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('login.ejs', { title: 'Login Panel', message : req.flash('loginMessage')});
});


module.exports = router
