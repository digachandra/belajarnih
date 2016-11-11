const express = require('express')
const router = express.Router()

router.get('/test', function(req,res){
  res.render('supervisordashboard.supervisor.ejs')
})

module.exports = router
