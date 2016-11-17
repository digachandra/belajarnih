var express = require('express');
const UserController = require('../controllers/users')
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next){
  console.log(req.session, "session seharusnya didestroy");
  res.render('login.ejs', { title: 'Login Panel', message : req.flash('loginMessage')});
});


module.exports = router
