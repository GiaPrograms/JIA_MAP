const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const factorsController = require('../controllers/factors')

router
.get('/', factorsController.getAll)
.get('/:id', factorsController.getOne)
.post('/', isAuth, factorsController.add)
.patch('/:id', isAuth, factorsController.update)
.delete('/:id', isAuth, factorsController.delete)

module.exports = router