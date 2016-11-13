const express = require('express')
const router = express.Router()
const apiSupervisor = require('./apisupervisor')
const apiSeeding = require('./api.seeding')
const UserController = require('../controllers/users')

router.use('/api/supervisor', apiSupervisor)
router.use('/api/seeding', apiSeeding)
router.get('/forgot',UserController.forgotGet)
router.post('/forgot',UserController.forgotPost)
router.get('/reset/:token',UserController.resetGet)
router.post('/reset/:token',UserController.resetPost)

module.exports = router
