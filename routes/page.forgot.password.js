var express = require('express');
const UserController = require('../controllers/users')

var router = express.Router();

router.get('/forgotPassword',UserController.forgotGet)
router.post('/forgotPassword',UserController.forgotPost)
module.exports = router
