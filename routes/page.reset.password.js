var express = require('express');
const UserController = require('../controllers/users')

var router = express.Router();

router.get('/:token',UserController.resetGet)
router.post('/:token',UserController.resetPost)

module.exports = router
