var express = require('express');
const UserController = require('../controllers/users')

var router = express.Router();

router.get('/forgot',UserController.forgotGet)
router.post('/forgot',UserController.forgotPost)
router.get('/reset/:token',UserController.resetGet)
router.post('/reset/:token',UserController.resetPost)

module.exports = router
