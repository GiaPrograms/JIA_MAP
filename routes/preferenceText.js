const express = require('express')
const router = express.Router()

const sanitizeBody = require('../middleware/sanitizeBody')
const isAuth = require('../middleware/auth')

const preferenceTextController = require('../controllers/preferenceText')

router
.get('/user', isAuth, preferenceTextController.getRecord)
.post('/', isAuth, sanitizeBody, preferenceTextController.add)

module.exports = router