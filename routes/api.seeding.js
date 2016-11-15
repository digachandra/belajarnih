const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')
const Maps = require('../models/maps.js')
const today =new Date()
var yesterday = new Date()
 yesterday.setDate(yesterday.getDate()-1)

router.get('/get', function(req,res){
  Maps.find({}).populate('owner').populate('supervisor').exec(function(err,result){
    res.json(result)
  })
})

router.get('/set', function(req,res){

  let newowner  = new Users({userEmail: "gg@businessowner.com", encryptedPassword: "bukanencryptedpassword"})
  let newowner2  = new Users({userEmail: "ivan@businessowner.com", encryptedPassword: "ivanpassword"})
  let newspv  = new Users({userEmail: "gelow@businesssupervisor.com", encryptedPassword: "jugabukanencryptedpassword"})

  let newbusiness1pin1 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 1", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: "2016-11-14T03:19:49.131Z"})
  newbusiness1pin1.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness3pin1 = new Maps({owner: newowner2._id, businessName: "goclean", pinDropName: "Branch Pengiriman go clean1", position: {lat: "8", lng: "3"}, supervisor: newspv._id, inputTime: "2015-11-14T03:19:49.131Z"})
  newbusiness3pin1.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
  let newbusiness3pin2 = new Maps({owner: newowner2._id, businessName: "goclean", pinDropName: "Branch Pengiriman go clean2", position: {lat: "4", lng: "2"}, supervisor: newspv._id, inputTime: "2015-11-14T03:19:49.131Z"})
  newbusiness3pin2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
  let newbusiness3pin3 = new Maps({owner: newowner2._id, businessName: "myspa", pinDropName: "Branch Pengiriman go spa", position: {lat: "5", lng: "6"}, supervisor: newspv._id, inputTime: "2015-11-14T03:19:49.131Z"})
  newbusiness3pin3.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness1pin2 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: "2016-11-13T03:19:49.131Z"})
  newbusiness1pin2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness1pin3 = new Maps({owner: newowner._id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 3", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: "2016-11-10T03:19:49.131Z"})
  newbusiness1pin3.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness2pin1 = new Maps({owner: newowner._id, businessName: "makanan", pinDropName: "Branch Makanan 1", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: "2016-11-8T03:19:49.131Z"})
  newbusiness2pin1.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  let newbusiness2pin2 = new Maps({owner: newowner._id, businessName: "makanan", pinDropName: "Branch Makanan 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: "2016-11-7T03:19:49.131Z"})
  newbusiness2pin2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})

  newowner.save(function(err,owner){
    newowner2.save(function(err,owner){
      newspv.save(function(err,spv){
        newbusiness1pin1.save(function(err,map1){
          newbusiness1pin2.save(function(err,map2){
            newbusiness1pin3.save(function(err,map3){
              newbusiness2pin1.save(function(err,map4){
                newbusiness3pin1.save(function(err,map5){
                  newbusiness3pin2.save(function(err,map5){
                    newbusiness3pin3.save(function(err,map5){
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
      })
    })
  })
})

module.exports = router
