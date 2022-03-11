const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const effectivenessController = require('../controllers/effectiveness')

router.get('/', isAuth, effectivenessController.getAll)
router.get('/user', isAuth, effectivenessController.getRecord)
router.post('/', isAuth, effectivenessController.add)

module.exports = router