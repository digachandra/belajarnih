var express = require('express');
var User = require('../models/users');
var passport = require('passport');
const UserController = require('../controllers/users')

var router = express.Router();


router.post('/login',
passport.authenticate('local-login', {successRedirect : '/api/users/home', failureRedirect : '/login', failureFlash : true}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){
      return res.status(500).send(err);
    }
    res.json(users);
  });
});

router.get('/result',function(req,res,next){
  res.json({message:"register berhasil"})// diganti dengan redirect kemana
})
router.get('/failed', function(req, res, next){
  res.json({message:"gagal login"})// diganti dengan redirect kemana
});

router.get('/home', isLoggedIn, function(req, res) {
  // console.log("ini ssession",req.session);
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  if(req.session.role==1){
    res.redirect('/supervisor/dashboard')
  } else {
    //res.redirect('/map/addMap')
    res.redirect('/map/list')
  }
});

router.post('/register', passport.authenticate('local-signup', {successRedirect : '/map/list', failureRedirect : '/register', failureFlash : true}));
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

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy()
  res.redirect('/login');
  });

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}


module.exports = router;
