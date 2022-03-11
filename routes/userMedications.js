const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const userMedicationsController = require('../controllers/userMedications')

router
.get('/user', isAuth, userMedicationsController.get)
.post('/', isAuth, userMedicationsController.add)

module.exports = router