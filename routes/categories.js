const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const categoriesController = require('../controllers/categories')

router
.get('/', categoriesController.getAll)
.get('/:id', categoriesController.getOne)
.post('/', isAuth, categoriesController.add)
.patch('/:id', isAuth, categoriesController.update)
.delete('/:id', isAuth, categoriesController.delete)

module.exports = router