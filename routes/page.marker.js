const validator = require("email-validator");
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

Array.prototype.contains = function (v) {
    return this.indexOf(v) > -1;
}

router.get('/', function(req,res){
  res.render('page.map/index.ejs')
})

router.put('/addMarker', function(req,res){
  Maps.findOne({'owner':req.body.userID, 'position.lat':req.body.lat, 'position.lng':req.body.lng}, function(err,pindrop){
    Users.findOne({'userEmail':req.body.supervisor}, function(err,user){
        pindrop.pinDropName = req.body.pindropName
        pindrop.listField[0].fieldName = req.body.fieldName
        pindrop.listField[0].targetComparison = req.body.salesCond
        pindrop.listField[0].targetValue = req.body.totalSales
        pindrop.supervisor = user._id
        pindrop.save()
        let message = '{"message":"new pin drop is updated successfully"}'
        let obj = JSON.parse(message)
        res.json(obj)
      })
  })
})

router.delete('/addMarker', function(req,res){
  Maps.remove({'owner':req.body.userID, 'position.lat':req.body.lat, 'position.lng':req.body.lng}, function(err,pindrop){
    console.log('yang didelete', pindrop);
    let message = '{"message":"new pin drop is deleted successfully"}'
    let obj = JSON.parse(message)
    res.json(obj)
  })
})

router.get('/addMarker', function(req,res){
  res.render('page.marker/addmarker.ejs')
})


router.post('/addMarker', function(req,res){
  console.log('==================req when add marker', req.body);
  //email validation
  let email = req.body.supervisor
  let userId = req.body.userID
  let pindropName =  req.body.pindropName
  let totalSales = req.body.totalSales
  let salesCond = req.body.salesCond
  let businessName = req.body.businessName
  let lat = req.body.lat
  let lng = req.body.lng
  let supervisor = 'supervisor'
  let listField = []
      listField.push({
        fieldName: req.body.fieldName,
        fieldType: 'NUMBER',
        targetValue: totalSales,
        targetComparison: salesCond
      })
  let position = {
    lat:lat,
    lng:lng
  }
  let newmap = new Maps({
      owner: userId,
      businessName: businessName,
      pinDropName: pindropName,
      position : position,
      listField: listField
  })


  validator.validate_async(email, function(err, isValidEmail) {
        if(pindropName==''||totalSales==''||salesCond==''||email==''){
          let message = '{"message":"please insert all data"}'
          let obj = JSON.parse(message)
          res.json(obj)
        }
        else if(!isValidEmail){
          let message = `{"message":"email is not valid","supervisor":"${email}"}`
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
                userEmail: email,
                role:role
              })
              newuser.save(function(err,newuser){
                //send email for new user
                  var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
                  var mailOptions = {
                      from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
                      to: email, // list of receivers
                      subject: 'Supervisor Confirmation ✔', // Subject line
                      text: 'You are receiving this email because your owner business has requested you as supervisor, \n'+
                            'please set your password by click this link.\n\n'+
                            'http://localhost:3000/setuppassword/'+newuser._id
                  };

                  transporter.sendMail(mailOptions, function(err) {});
                  newmap.supervisor = newuser._id
                  newmap.save(function(err,newmap){
                      res.json(newmap)
                  })
              })
            }
            else{

              if(!user.role.contains(1)){
                user.role.push(1)
                user.save()
              }
              newmap.supervisor = user._id
              //send email for user that has been registered and already confirmed
              if(user.encryptedPassword){
                var transporter = nodemailer.createTransport('smtps://mapinczero%40gmail.com:mapinczero0@smtp.gmail.com');
                var mailOptions = {
                    from: '"Map Inc. 👥" <mapinczero@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Supervisor Confirmation ✔', // Subject line
                    text: 'You are receiving this email because your owner business has requested you as supervisor, please log in into our system.\n\n'
                };

                transporter.sendMail(mailOptions, function(err) {});
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

                  transporter.sendMail(mailOptions, function(err) {});
              }
              newmap.save(function(err,newmap){
                  res.json(newmap)
              })
            }
          })
        }
  });


})

module.exports = router
