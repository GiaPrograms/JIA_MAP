const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const treatmentCategoriesController = require('../controllers/treatmentCategories')

router
.get('/:id', treatmentCategoriesController.getAll)
.post('/', isAuth, treatmentCategoriesController.adjust)

module.exports = router