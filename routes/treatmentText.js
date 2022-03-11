const express = require('express')
const router = express.Router()

const sanitizeBody = require('../middleware/sanitizeBody')
const isAuth = require('../middleware/auth')

const treatmentTextController = require('../controllers/treatmentText')

router
.get('/user', isAuth, treatmentTextController.getRecord)
.post('/', isAuth, sanitizeBody, treatmentTextController.add)

module.exports = router