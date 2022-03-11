const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const classificationsController = require('../controllers/classifications')

router
.get('/', classificationsController.getAll)
.get('/:id', classificationsController.getOne)
.post('/', isAuth, classificationsController.add)
.patch('/:id', isAuth, classificationsController.update)
.delete('/:id', isAuth, classificationsController.delete)

module.exports = router