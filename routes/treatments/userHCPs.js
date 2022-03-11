const express = require('express')
const router = express.Router()
const isAuth = require("../../middleware/auth")

const userHCPsController = require('../../controllers/treatments/userHCPs')

router
.get('/user', isAuth, userHCPsController.get)
.post('/', isAuth, userHCPsController.add)

module.exports = router