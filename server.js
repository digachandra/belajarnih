const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var users = require('./routes/user');


const Users = require('./models/users.js')
const Maps = require('./models/maps.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const path = require('path')
const apiSupervisor = require('./routes/apisupervisor.js')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


// used to deserialize the user
passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
//kalo ada user
  Users.findOne({ 'userEmail' :  email }, function(err, user) {
    console.log("ini user",user);
    if (err){
      return done(err);
    }
    if (user) {
      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    } else {
      var newUser = new Users();
      newUser.userEmail = email;
      newUser.encryptedPassword = newUser.generateHash(password);
      newUser.role = req.body.role
      newUser.save(function(err) {
        if (err){
          throw err;
        }
        return done(null, newUser);
      });
    }
  });
}));

passport.use('local-login', new LocalStrategy({
  usernameField : 'email', // by default, local strategy uses username and password, we will override with email
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {
  Users.findOne({ 'userEmail' :  email }, function(err, user) {
    if (err){
      return done(err);
    }
    if (!user){
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }
    if (!user.validPassword(password)){
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }
    return done(null, user);
  });
}));



var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
app.set('view-engine','ejs')
app.use(cors())
app.use(morgan())
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'supermanbatman',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api/users', users);


app.use('/', express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://localhost:27017/testing-mapinc-5')

app.use('/api/supervisor', apiSupervisor)

//SeedingDataUser
app.get('/seedingdata', function(req,res){
  let newuser  = new Users({userEmail: "andrew@andrew.com", encryptedPassword: "halhlahlha"})
  let newspv  = new Users({userEmail: "inispv@andrew.com", encryptedPassword: "halhlahlha"})
  newuser.save(function(err,result){
    newspv.save(function(err,result4){
      let newmap = new Maps({owner: newuser._id, businessName: "halo", pinDropName: "BranchMana", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
      newmap.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
      newmap.save(function(err2,result2){
        let newmap2 = new Maps({owner: newuser._id, businessName: "halo", pinDropName: "BranchMana 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
        newmap2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt" })
        newmap2.save(function(err3,result3){
          res.json({message: "seed user berhasil"})
        })
      })
    })
  })
})

app.get('/getseedingdata', function(req,res){
  Maps.find({}).populate('owner').populate('supervisor').exec(function(err,result){
    res.json(result)
  })
})

app.post('/postdata', function(req,res){
  Maps.findOne({}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

app.listen(port)
console.log('serving on port : ', port)
