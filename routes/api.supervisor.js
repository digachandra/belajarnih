const validator = require("email-validator");
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

router.get('/test', function(req,res){
  res.render('supervisordashboard.supervisor.ejs')
})

router.post('/postdata', function(req,res){
  Maps.findOne({}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

router.get('/test', function(req,res){
  res.render('supervisordashboard.supervisor.ejs')
})

//addEmailSupervisor
router.get('/addEmail', function(req,res){
  res.render('supervisor.addEmail.ejs')
})
router.post('/postAddEmail', function(req,res){
  let email = req.body.value
  validator.validate_async(email, function(err, isValidEmail) {
        if(!isValidEmail)console.error('email is not correct - ariadiprana')
        else{
          Users.findOne({'userEmail':email}, function(err,user){
            if(err)console.error('error in adding supervisor email - ARIADIPRANA IS HERE')
            // if not found, system will add new user for supervisor
            if(!user){
              let newuser  = new Users({
                userEmail: email
              })
              newuser.save(function(err,newPin){
                //send email
                  var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:password@smtp.gmail.com');
                  // setup e-mail data with unicode symbols
                  var mailOptions = {
                      from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
                      to: email, // list of receivers
                      subject: 'Supervisor Confirmation ✔', // Subject line
                      text: 'You are receiving this email because your owner business has requested you as supervisor, \n'+
                            'please set your password by click this link.\n\n'+
                            'http://localhost:3000/setuppassword/'+newPin._id
                  };

                  transporter.sendMail(mailOptions, function(err) {
                    res.json(user)
                  });
              })
            }
            else{
              if(user.encryptedPassword){
              //send email
                var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:password@smtp.gmail.com');
                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Supervisor Confirmation ✔', // Subject line
                    text: 'You are receiving this email because your owner business has requested you as supervisor, please log in into our system.\n\n'
                };

                transporter.sendMail(mailOptions, function(err) {
                  res.json(user)
                });
              }
              else{
                //send email
                  var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:password@smtp.gmail.com');
                  // setup e-mail data with unicode symbols
                  var mailOptions = {
                      from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
                      to: email, // list of receivers
                      subject: 'Supervisor Confirmation ✔', // Subject line
                      text: 'You are receiving this email because your owner business has requested you as supervisor, \n'+
                            'please set your password by click this link.\n\n'+
                            'http://localhost:3000/setuppassword/'+user._id
                  };

                  transporter.sendMail(mailOptions, function(err) {
                    res.json(user)
                  });
              }
            }

          })
        }
  });
})

module.exports = router
