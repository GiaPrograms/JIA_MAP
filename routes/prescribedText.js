const express = require('express')
const router = express.Router()

const sanitizeBody = require('../middleware/sanitizeBody')
const isAuth = require('../middleware/auth')

const prescribedTextController = require('../controllers/prescribedText')

router
.get('/user', isAuth, prescribedTextController.getRecord)
.post('/', isAuth, sanitizeBody, prescribedTextController.add)

module.exports = router