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
    if(pin.listField[0].targetComparison =="GT"){
      if(req.body.value >= pin.listField[0].targetValue){
        pin.listField[0].isPass= true
      } else {
        pin.listField[0].isPass= false
      }
    } else if(pin.listField[0].targetComparison =="LT"){
      if(req.body.value <= pin.listField[0].targetValue){
        pin.listField[0].isPass= true
      } else {
        pin.listField[0].isPass= false
      }
    }
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

router.get('/getownerlist', function(req,res){
  let user_id = req.session.passport.user
  // let user_id= "582adf2be1c6c1031700511a"
  // console.log('ini passport user', req.session.passport.user)
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,owners){
    res.json(owners)
  })
})


router.get('/getbusinesslist/:owner_id', function(req,res){
  let user_id = req.session.passport.user
  // let user_id= "582adf2be1c6c1031700511a"
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,businesses){
    res.json(businesses)
  })
})

router.get('/getpinlist/:businessname', function(req,res){
  let user_id = req.session.passport.user
  // let user_id= "582adf2be1c6c1031700511a"
  Maps.find({businessName:req.params.businessname, supervisor: user_id}, function(err,pin){
    res.json(pin)
  })
})

router.get('/getpindate/', function(req,res){
  let user_id = req.session.passport.user
  // let user_id= "582adf2be1c6c1031700511a"
  Maps.find({supervisor: user_id, owner: req.query.ownerid, businessName: req.query.businessname, pinDropName: req.query.pindropname, "listField.value": null }, function(err,pin){
    console.log(pin)
    res.json(pin)
  })
})

router.get('/dashboard', function(req,res){
  if(req.session.passport.user){
    let user_id = req.session.passport.user
    // let user_id= "58299ad3baff8813d5911300"
    //
    res.render('dashboard.supervisor.ejs', {email: req.session.email})
  } else {
    res.redirect('/api/users/login')
  }
})

module.exports = router
