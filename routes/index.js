const express = require('express')
const router = express.Router()
const pageMap = require('./page.map')
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')
const forgotPassword = require('./page.forgot.password')
const apiSupervisor = require('./api.supervisor')
const apiSeeding = require('./api.seeding')
const maps = require('./api.map')
const marker = require('./page.marker')

router.get('/setuppassword/:user_id', function(req,res){
  Users.findOne({_id: req.params.user_id}, function(err, user){
    if(user){
      if(user.encryptedPassword == null){
        res.render('setuppassword.supervisor.ejs', {userEmail: user.userEmail, userId: user._id})
      } else {
        res.redirect('/api/users/login')
      }
    } else{
      res.json({message: "user tidak ditemukan"})
    }
  })
})


router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.use('/user',forgotPassword)
router.use('/map', pageMap)
router.use('/marker',marker)
router.use('/api/maps', maps);



module.exports = router
