//create new express router
var express = require('express')
var router = express.Router()
var dataMaps = require('../controllers/maps')
//export router

router.get('/selectpin', dataMaps.selectPin)


module.exports = router
