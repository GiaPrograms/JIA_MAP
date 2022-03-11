const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const motivationsController = require('../controllers/motivations')

router.get('/', isAuth, motivationsController.getAll)
router.get('/user', isAuth, motivationsController.getRecord)
router.post('/', isAuth, motivationsController.add)

module.exports = router