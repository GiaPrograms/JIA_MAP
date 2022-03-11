const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const medicationsController = require('../controllers/medications')

router
.get('/', medicationsController.getAll)
.get('/:id', medicationsController.getOne)
.post('/', isAuth, medicationsController.add)
.patch('/:id', isAuth, medicationsController.update)
.delete('/:id', isAuth, medicationsController.delete)

module.exports = router