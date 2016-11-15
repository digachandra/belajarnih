const express = require('express')
const router = express.Router()
const pageMap = require('./page.map')
const forgotPassword = require('./page.forgot.password')
const apiSupervisor = require('./api.supervisor')
const apiSeeding = require('./api.seeding')
const maps = require('./api.map')
const marker = require('./page.marker')


router.use('/api/bo', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.use('/user',forgotPassword)
router.use('/map', pageMap)
router.use('/marker',marker)
router.use('/api/maps', maps);



module.exports = router
