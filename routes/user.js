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

router.get('/search/:id', function(req, res, next) {
  User.find({"userEmail": req.params.id}, function(err, users){
    if(err){
      return res.status(500).send(err);
    }
    res.json(users);
  });
});

router.post('/register', passport.authenticate('local-signup', {successRedirect : '/result', failureRedirect : {message:"gagal"}, failureFlash : true}));

router.get('/result',function(req,res,next){
  console.log("berhasil");
})


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
