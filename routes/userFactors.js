const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const userFactorsController = require('../controllers/userFactors')

router
.get('/user', isAuth, userFactorsController.get)
.post('/', isAuth, userFactorsController.add)

module.exports = router