var express = require('express');
const UserController = require('../controllers/users')

var router = express.Router();

router.get('/',UserController.forgotGet)
router.post('/',UserController.forgotPost)
module.exports = router
