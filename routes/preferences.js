const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const preferencesController = require('../controllers/preferences')

router
.get('/', preferencesController.getAll)
.get('/:id', preferencesController.getOne)
.post('/', isAuth, preferencesController.add)
.patch('/:id', isAuth, preferencesController.update)
.delete('/:id', isAuth, preferencesController.delete)

module.exports = router