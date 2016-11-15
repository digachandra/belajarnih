//create new express router
var express = require('express')
var router = express.Router()
var dataMaps = require('../controllers/maps')
//export router

router.get('/listpin', dataMaps.listPin)
router.get('/detailspin/:id', dataMaps.getDetailsPin)
router.get('/maplist', dataMaps.mapList)


module.exports = router
