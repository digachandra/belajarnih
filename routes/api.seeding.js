const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')
const Maps = require('../models/maps.js')

router.get('/set', function(req,res){
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

router.get('/get', function(req,res){
  Maps.find({}).populate('owner').populate('supervisor').exec(function(err,result){
    res.json(result)
  })
})

router.post('/postdata', function(req,res){
  Maps.findOne({}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

module.exports = router
