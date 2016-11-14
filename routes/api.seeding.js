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

router.get('/tambahbisnismakanan', function(req,res){
  let spv_id = "58294c019c17424e7eb63886"
  let owner_id = "58294c019c17424e7eb63885"
  let newmap = new Maps({owner: owner_id, businessName: "makanan", pinDropName: "Branch 6", position: {lat: "8", lng: "7"}, supervisor: spv_id, inputTime: new Date()})
  newmap.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
  newmap.save(function(err2,result2){
    let newmap2 = new Maps({owner: owner_id, businessName: "makanan", pinDropName: "Branch 6", position: {lat: "8", lng: "7"}, supervisor: spv_id, inputTime: new Date()})
    newmap2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt" })
    newmap2.save(function(err3,result3){
      res.json({message: "seed user berhasil"})
    })
  })
})

router.get('/tambahbisnispengiriman', function(req,res){
  let spv_id = "58294c019c17424e7eb63886"
  let owner_id = "58294c019c17424e7eb63885"
  let newmap = new Maps({owner: owner_id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 1", position: {lat: "8", lng: "7"}, supervisor: spv_id, inputTime: new Date()})
  newmap.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
  newmap.save(function(err2,result2){
    let newmap2 = new Maps({owner: owner_id, businessName: "pengiriman", pinDropName: "Branch Pengiriman 2", position: {lat: "8", lng: "7"}, supervisor: spv_id, inputTime: new Date()})
    newmap2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt" })
    newmap2.save(function(err3,result3){
      res.json({message: "seed user berhasil"})
    })
  })
})

router.get('/seedingcomplete', function(req,res){
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
