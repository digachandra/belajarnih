const express = require('express')
const router = express.Router()
const Maps = require('../models/maps.js')

router.get('/test', function(req,res){
  res.render('supervisordashboard.supervisor.ejs')
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
