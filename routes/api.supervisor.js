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
  Maps.findOne({owner: req.body.owner, businessName: req.body.businessname, pinDropName: req.body.pindropname}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

router.get('/getownerlist', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,owners){
    res.json(owners)
  })
})


router.get('/getbusinesslist/:owner_id', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,businesses){
    res.json(businesses)
  })
})

router.get('/getpinlist/:businessname', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({businessName:req.params.businessname, supervisor: user_id}, function(err,pin){
    res.json(pin)
  })
})

router.get('/getpindate/', function(req,res){
  let user_id = "58294c019c17424e7eb63886"
  Maps.find({supervisor: user_id, owner: req.query.ownerid, businessName: req.query.businessname, pinDropName: req.query.pindropname, "listField.value": null }, function(err,pin){
    console.log(pin)
    res.json(pin)
  })
})

router.get('/dashboard', function(req,res){
  res.render('dashboard.supervisor.ejs')
})

//addEmailSupervisor
router.get('/addEmail', function(req,res){
  res.render('supervisor.addEmail.ejs')
})
router.post('/postAddEmail', function(req,res){
  let email = req.body.value
  console.log(email);
  validator.validate_async(email, function(err, isValidEmail) {
        if(!isValidEmail){
          let message = '{"message":"email is not valid"}'
          let obj = JSON.parse(message)
          res.json(obj)
        }
        else{
          Users.findOne({'userEmail':email}, function(err,user){
            if(err)console.error('error in adding supervisor email - ARIADIPRANA IS HERE')
            // if not found, system will add new user for supervisor
            if(!user){
              let newuser  = new Users({
                userEmail: email
              })
              newuser.save(function(err,newPin){
                //send email for new user
                  var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
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
              //send email for user that has been registered and already confirmed
              if(user.encryptedPassword){
                var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
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
                //send email for user that has been registered but still not yet confirmed
                  var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
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
