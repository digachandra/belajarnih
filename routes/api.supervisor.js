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

//later move to non-api routes
router.get('/setuppassword/:user_id', function(req,res){
  Users.findOne({_id: req.params.user_id}, function(err, user){
    // if(user){
    //   if(user.encryptedPassword == null){
        res.render('setuppassword.supervisor.ejs', {userEmail: user.userEmail, userId: user._id})
    //   } else {
    //     res.redirect('/api/user/login')
    //   }
    // } else{
    //   res.json({message: "user tidak ditemukan"})
    // }
  })
})

router.post('/setuppassword', function(req,res){
  Users.findOne({_id: req.body.userid}, function(err,user){
    user.encryptedPassword = user.generateHash(req.body.password)
    user.save(function(err,savedUser){
      res.json(user)
    })
  })
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
  // let user_id = req.session.passport.user
  let user_id= "58299ad3baff8813d5911300"
  // console.log('ini passport user', req.session.passport.user)
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,owners){
    console.log('owners', owners)
    res.json(owners)
  })
})


router.get('/getbusinesslist/:owner_id', function(req,res){
  // let user_id = req.session.passport.user
  let user_id= "58299ad3baff8813d5911300"
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,businesses){
    res.json(businesses)
  })
})

router.get('/getpinlist/:businessname', function(req,res){
  // let user_id = req.session.passport.user
  let user_id= "58299ad3baff8813d5911300"
  Maps.find({businessName:req.params.businessname, supervisor: user_id}, function(err,pin){
    res.json(pin)
  })
})

router.get('/getpindate/', function(req,res){
  // let user_id = req.session.passport.user
  let user_id= "58299ad3baff8813d5911300"
  Maps.find({supervisor: user_id, owner: req.query.ownerid, businessName: req.query.businessname, pinDropName: req.query.pindropname, "listField.value": null }, function(err,pin){
    console.log(pin)
    res.json(pin)
  })
})

router.get('/dashboard', function(req,res){
  // let user_id = req.session.passport.user
  // let user_id= "58299ad3baff8813d5911300"
  //
  res.render('dashboard.supervisor.ejs', {email: req.session.email})
})

//addEmailSupervisor
Array.prototype.contains = function (v) {
    return this.indexOf(v) > -1;
}

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
              let role = []
              role.push(1)
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

              if(!user.role.contains(1)){
                user.role.push(1)
                user.save()
              }
              console.log('user.role',user.role);
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
