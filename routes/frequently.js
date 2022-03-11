const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const frequentlyController = require('../controllers/frequently')

router
.get('/', isAuth, frequentlyController.getAll)
.get('/user', isAuth, frequentlyController.getOne)
.post('/', isAuth, frequentlyController.add)

module.exports = router