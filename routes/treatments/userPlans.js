const express = require('express')
const router = express.Router()
const isAuth = require("../../middleware/auth")

const userPlansController = require('../../controllers/treatments/userPlans')

router
.get('/', userPlansController.getAll)
.get('/user', isAuth, userPlansController.get)
.post('/', isAuth, userPlansController.add)
.delete('/', isAuth, userPlansController.delete)

module.exports = router