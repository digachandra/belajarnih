const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

router.get('/', function(req,res){
  res.render('page.map/index.ejs')
})

router.get('/addMap', function(req,res){
  res.render('page.map/addmap.ejs', {userId:req.session.passport.user})
})


router.post('/addMap', function(req,res){
  Users.findById({'_id':req.body.userID}, function(err,user){
    let newmap = new Maps({owner: req.body.userId, businessName: req.body.businessName})
    newmap.save(function(err,newmap){
      res.render('page.marker/addmarker.ejs', {userId:req.body.userId, businessName:req.body.businessName})
    })
  })
})

module.exports = router
