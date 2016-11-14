const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const path = require('path')
const routes = require('./routes')
const users = require('./routes/user')
const expressValidator = require('express-validator')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');


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
app.use(expressValidator())
app.use(flash());

app.use('/', express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://localhost:27017/testing-mapinc-5')

app.use('/', routes)
app.use('/api/users', users);


app.listen(port)
console.log('serving on port : ', port)
