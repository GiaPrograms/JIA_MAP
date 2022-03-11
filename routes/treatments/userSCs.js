const express = require('express')
const router = express.Router()
const isAuth = require("../../middleware/auth")

const userSCsController = require('../../controllers/treatments/userSCs')

router
.get('/user', isAuth, userSCsController.get)
.post('/', isAuth, userSCsController.add)

module.exports = router