const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const userSuggestionsController = require('../controllers/userSuggestion')

router
.get('/user', isAuth, userSuggestionsController.get)
.post('/', isAuth, userSuggestionsController.add)

module.exports = router