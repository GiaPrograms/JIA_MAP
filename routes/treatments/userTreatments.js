const express = require('express')
const router = express.Router()
const isAuth = require("../../middleware/auth")

const userTreatmentsController = require('../../controllers/treatments/userTreatments')

router
.get('/user', isAuth, userTreatmentsController.get)
.post('/', isAuth, userTreatmentsController.add)

module.exports = router