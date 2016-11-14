const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')
const Maps = require('../models/maps.js')

router.get('/get', function(req,res){
  Maps.find({}).populate('owner').populate('supervisor').exec(function(err,result){
    res.json(result)
  })
})

router.get('/set', function(req,res){
  let newowner  = new Users({userEmail: "andrew@businessowner.com", encryptedPassword: "bukanencryptedpassword"})
  let newspv  = new Users({userEmail: "andrew@businesssupervisor.com", encryptedPassword: "jugabukanencryptedpassword"})

  let newbusiness1pin1 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 1", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
  newbusiness1pin1.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness1pin2 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
  newbusiness1pin2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness1pin3 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 3", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
  newbusiness1pin3.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness2pin1 = new Maps({owner: newowner._id, businessName: "makanan", pinDropName: "Branch Makanan 1", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
  newbusiness2pin1.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness2pin2 = new Maps({owner: newowner._id, businessName: "makanan", pinDropName: "Branch Makanan 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
  newbusiness2pin2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  newowner.save(function(err,owner){
    newspv.save(function(err,spv){
      newbusiness1pin1.save(function(err,map1){
        newbusiness1pin2.save(function(err,map2){
          newbusiness1pin3.save(function(err,map3){
            newbusiness2pin1.save(function(err,map4){
              newbusiness2pin2.save(function(err,map5){
                res.json({message: "add berhasil"})
              })
            })
          })
        })
      })
    })
  })
})

module.exports = router
