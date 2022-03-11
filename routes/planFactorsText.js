const express = require('express')
const router = express.Router()

const sanitizeBody = require('../middleware/sanitizeBody')
const isAuth = require('../middleware/auth')

const planFactorsTextController = require('../controllers/planFactorsText')

router
.get('/user', isAuth, planFactorsTextController.getRecord)
.post('/', isAuth, sanitizeBody, planFactorsTextController.add)

module.exports = router