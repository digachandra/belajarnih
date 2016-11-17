const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

router.get('/detail/:id', function(req,res){
  let mapid = req.params.id
  if(req.session.passport) res.render('page.map/index.ejs', {userId:req.session.passport.user, mapId: mapid})
  else res.redirect('/api/users/login')
})

router.get('/list', function(req,res){
  if(req.session.passport) res.render('page.map/list.ejs', {userId:req.session.passport.user})
  else res.redirect('/api/users/login')
})

router.get('/addMap', function(req,res){
  if(req.session.passport) res.render('page.map/addmap.ejs', {userId:req.session.passport.user})
  else res.redirect('/api/users/login')
})


router.post('/addMap', function(req,res){
  Users.findById({'_id':req.body.userID}, function(err,user){
    let newmap = new Maps({owner: req.body.userID, businessName: req.body.businessName})
    newmap.save(function(err,newmap){
      //res.render('page.marker/addmarker.ejs', {userId:req.body.userID, businessName:req.body.businessName})
      res.json({"mapID": newmap._id, "businessName": newmap.businessName})
    })
  })
})


router.post('/deleteMap', function(req,res){
  Maps.remove({'owner':req.body.userID, businessName: req.body.businessName}, function(err,map){
    if(err){
      res.json({success: false})
      return
    }
      res.json({success: true})
  })
})

router.post('/editMap', function(req,res){
  Maps.find({businessName: req.body.businessName, owner:req.body.userID}, function (err, result) {
    if(err){
      res.json({success: false, message: "no maps found with owner: "+req.body.userID +"and Business Name: "+ req.body.businessName})
      return
    }
    Maps.update({businessName: req.body.businessName},{$set : {businessName: req.body.businessNameEdit}},{multi: true}, function (error, resultUpdated) {
      if(error){
        res.json({success: false, message: "Can't Update Business Name: "+ req.body.businessName})
        return
      }
        res.json({success: true, message: "Business Name: "+ req.body.businessName+ " has renamed to "+req.body.businessNameEdit, data: resultUpdated})
    })

  })
})

router.get('/detailMap', function(req,res){
  let owner = "582bcaf48862cf027bcf24e9"
  let businessName = "HACKTIV8"
  let createdAt = "2016-11-16T02:57:26.482Z"
  Maps.find({owner:owner,businessName:businessName,createdAt:{ $eq : createdAt}}).sort({inputTime: -1}).exec(function(err,data){
    res.json(data)
  })
})



module.exports = router
