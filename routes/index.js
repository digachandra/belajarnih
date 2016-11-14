const express = require('express')
const router = express.Router()
const apiSupervisor = require('./apisupervisor')
const apiSeeding = require('./api.seeding')
const user = require('./user')


router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.use('/api/user', user)



module.exports = router
