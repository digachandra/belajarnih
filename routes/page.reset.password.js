var express = require('express');
const UserController = require('../controllers/users')

var router = express.Router();

router.get('/resetPassword/:token',UserController.resetGet)
router.post('/resetPassword/:token',UserController.resetPost)

module.exports = router
