const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const preferenceCategoriesController = require('../controllers/preferenceCategories')

router
.get('/:id', preferenceCategoriesController.getAll)
.post('/', isAuth, preferenceCategoriesController.adjust)

module.exports = router