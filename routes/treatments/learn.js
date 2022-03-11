const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/auth')

const learnController = require('../../controllers/treatments/learn')

router
.get('/', learnController.getAll)
.get('/:id', learnController.getTreatLinks)
.post('/', isAuth, learnController.add)
.patch('/', isAuth, learnController.update)
.delete('/', isAuth, learnController.delete)

module.exports = router