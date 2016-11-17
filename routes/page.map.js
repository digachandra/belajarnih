const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')
const helper = require('../helpers/middlewares.js')

router.get('/detail/:id', function(req,res){
  let mapid = req.params.id
  if(req.session.passport) res.render('page.map/index.ejs', {userId:req.session.passport.user, mapId: mapid})
  else res.redirect('/login')
})

router.get('/list', function(req,res){
  if(req.session.passport) res.render('page.map/list.ejs', {userId:req.session.passport.user})
  else res.redirect('/login')
})

router.get('/addMap', function(req,res){
  if(req.session.passport) res.render('page.map/addmap.ejs', {userId:req.session.passport.user})
  else res.redirect('/login')
})

router.post('/addMap',function(req,res){
  Users.findById({'_id':req.body.userID}, function(err,user){
    let newmap = new Maps({owner: req.body.userID, businessName: req.body.businessName})
    newmap.save(function(err,newmap){
      //res.render('page.marker/addmarker.ejs', {userId:req.body.userID, businessName:req.body.businessName})
      res.json({"mapID": newmap._id, "businessName": newmap.businessName})
    })
  })
})

module.exports = router
