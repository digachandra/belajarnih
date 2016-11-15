const express = require('express')
const router = express.Router()
const pageMap = require('./page.map')
const forgotPassword = require('./page.forgot.password')
const apiSupervisor = require('./api.supervisor')
const apiSeeding = require('./api.seeding')
const user = require('./user')
const maps = require('./api.map')


router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.use('/api/user', user)
router.use('/user',forgotPassword)
router.use('/map', pageMap)
router.use('/api/users', user);
router.use('/api/maps', maps);



module.exports = router
