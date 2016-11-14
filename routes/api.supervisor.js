const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')

router.get('/test', function(req,res){
  res.render('supervisordashboard.supervisor.ejs')
})

router.post('/postdata', function(req,res){
  Maps.findOne({owner: req.body.owner, businessName: req.body.businessname, pinDropName: req.body.pindropname}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

router.get('/getownerlist', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,owners){
    res.json(owners)
  })
})


router.get('/getbusinesslist/:owner_id', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({supervisor: user_id}).populate("owner").exec(function(err,businesses){
    res.json(businesses)
  })
})

router.get('/getpinlist/:businessname', function(req,res){
  let user_id = "58294c019c17424e7eb63886" //later change with req.session
  Maps.find({businessName:req.params.businessname, supervisor: user_id}, function(err,pin){
    res.json(pin)
  })
})

router.get('/dashboard', function(req,res){
  res.render('dashboard.supervisor.ejs')
})

module.exports = router
