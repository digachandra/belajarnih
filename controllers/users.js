var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/users');

/**
 * GET /forgot
 */
exports.forgotGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('forgot.password.ejs',{messages:""});
};

/**
 * POST /forgot
 */
exports.forgotPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.render('forgot.password.ejs',{ messages: req.flash('error') });
  }

  async.waterfall([
    function(done) {

      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ userEmail: req.body.email }, function(err, user) {
        console.log('user adalah', user);
        if (!user) {
          console.log('salah brooo');
          req.flash('error',{msg:'The email address ' + req.body.email + ' is not associated with any account.' });
          return res.render('forgot.password.ejs',{ messages: req.flash('error') });

        }
        console.log('user found :',req.body.email);
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      //////

      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
          to: user.userEmail, // list of receivers
          subject: 'reset ✔', // Subject line
          subject: '✔✿✿ Reset your password on Mapinc',
          text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/user/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          // html: '<b>Hello world 🐴</b>' // html body
      };

      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An email has been sent to ' + user.userEmail + ' with further instructions.' });
        console.log('reset email sent to', user.userEmail,req.session);
        res.redirect('/user/forgot');
      });
    }
  ]);
};

/**
 * GET /reset
 */
exports.resetGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec(function(err, user) {
      if (!user) {
        req.flash('error', { msg: '❎ Password reset token is invalid or has expired.' });
        return res.redirect('/user/forgot');
      }
      res.render('reset.password.ejs',{messages:""});
    });
};

/**
 * POST /reset
 */
exports.resetPost = function(req, res, next) {
  req.assert('password', 'Password must be at least 8 characters long').len(8);
  req.assert('confirm', 'Passwords must match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    console.log(errors);
    return res.render('reset.password.ejs',{ messages: req.flash('error') })
  }

  async.waterfall([
    function(done) {
      User.findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec(function(err, user) {
          if (!user) {
            req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }
          user.encryptedPassword = user.generateHash(req.body.password)
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
      var mailOptions = {
        from: 'mapinczero@gmail.com',
        to: user.userEmail,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.userEmail + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Your password has been changed successfully.' });
        res.redirect('/api/user/login');
      });
    }
  ]);
};
