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
  console.log('ARI ADIPRANA IS HERE ------------ req.body', req.body);
  let businessName =  req.body.value
  Users.findById({'_id':req.body.userID}, function(err,user){
    let newmap = new Maps({owner: req.body.userID, businessName: businessName})
    newmap.save(function(err,newmap){
      res.json({message: "proceed"})
    })
  })
})

module.exports = router
