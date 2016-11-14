const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

router.get('/', function(req,res){
  res.render('page.map/index.ejs')
})

router.get('/addMap', function(req,res){
  res.render('page.map/addmap.ejs')
})


router.post('/addMap', function(req,res){
  let email = 'andrew@andrew.com' // will be changed to request from session
  let businessName =  req.body.value
  Users.findOne({'userEmail':email}, function(err,user){
    let newmap = new Maps({owner: user._id, businessName: businessName})
    newmap.save(function(err,newmap){
      res.json({message: "new map is created successfully"})
    })
  })
})

module.exports = router
