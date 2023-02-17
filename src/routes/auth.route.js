const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validators = require("../middlewares/validators");
router.post('/register', validators.checkAuth, validators.validation,authController.register);
router.post('/login', authController.login);

module.exports = router;