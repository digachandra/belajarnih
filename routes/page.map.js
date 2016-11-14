const express = require('express')
const router = express.Router()

router.get('/', function(req,res){
  res.render('page.map/index.ejs')
})

module.exports = router
