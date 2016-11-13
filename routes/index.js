const express = require('express')
const router = express.Router()
const apiSupervisor = require('./apisupervisor')
const apiSeeding = require('./api.seeding')

router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)

module.exports = router
