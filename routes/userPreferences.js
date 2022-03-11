const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const userPreferencesController = require('../controllers/userPreferences')

router
.get('/user', isAuth, userPreferencesController.getPrefs)
.post('/', isAuth, userPreferencesController.add)

module.exports = router