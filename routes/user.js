var express = require('express');
var User = require('../models/users');
var passport = require('passport');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){
      return res.status(500).send(err);
    }
    res.json(users);
  });
});
router.get('/login', function(req, res, next){
  res.render('login.ejs', { title: 'Login Panel', message : req.flash('loginMessage')});
});
router.post('/login', passport.authenticate('local-login', {successRedirect : '/api/users/home', failureRedirect : '/api/users/failed', failureFlash : true}));
router.get('/result',function(req,res,next){
  res.json({message:"register berhasil"})// diganti dengan redirect kemana
})
router.get('/failed', function(req, res, next){
  res.json({message:"gagal login"})// diganti dengan redirect kemana
});
router.get('/home', function(req, res, next){
res.json({message:"berhasil login"}) // diganti dengan redirect kemana
});


router.get('/register', function(req, res, next) {
  res.render('register.ejs', { title: 'Register Panel', message: req.flash('signupMessage') });
});
router.post('/register', passport.authenticate('local-signup', {successRedirect : '/api/users/result', failureRedirect : {message:"gagal"}, failureFlash : true}));
router.put('/update/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user){
    if(err){
      res.status(500).send(err);
    }else{
      user.userEmail = req.body.email || user.userEmail;
      user.save(function(err, updatedUser){
        if(err){
          res.status(500).send(err);
        }else{
          res.json(updatedUser);
        }
      });
    }
  });
});

router.delete('/delete/:id', function(req, res, next){
  User.findByIdAndRemove(req.params.id, function(err, user){
    if(err){
      res.status(500).send(err);
    }else{
      user.message = "User succesfully deleted";
      res.json(user);
    }
  });
});


module.exports = router;
