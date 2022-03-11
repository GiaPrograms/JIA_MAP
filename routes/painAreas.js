const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const painAreasController = require('../controllers/painAreas')

router
.get('/', isAuth, painAreasController.getAll)
.get('/count/:area', isAuth, painAreasController.findAndCount)
.get('/user', isAuth, painAreasController.getRecord)
.post('/', isAuth, painAreasController.add)

module.exports = router