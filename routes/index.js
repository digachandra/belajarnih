const express = require('express')
const router = express.Router()
const pageMap = require('./page.map')
const apiSupervisor = require('./api.supervisor')
const apiSeeding = require('./api.seeding')
const UserController = require('../controllers/users')

router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.get('/forgot',UserController.forgotGet)
router.post('/forgot',UserController.forgotPost)
router.get('/reset/:token',UserController.resetGet)
router.post('/reset/:token',UserController.resetPost)

router.use('/map', pageMap)

module.exports = router
