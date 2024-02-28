const express = require('express');
const router = express.Router()
const registerController = require('../controller/registerController')
const registerSchema = require('../schema/registerSchema')
const joiValidator = require('../middleware/joiValidator')

router.route('/')
.post(joiValidator(registerSchema.registerSchema) , registerController)

module.exports = router