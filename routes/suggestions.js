const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const suggestionsController = require('../controllers/suggestions')

router
.get('/', suggestionsController.getAll)
.get('/:id', suggestionsController.getOne)
.post('/', isAuth, suggestionsController.add)
.patch('/:id', isAuth, suggestionsController.update)
.delete('/:id', isAuth, suggestionsController.delete)

module.exports = router