const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/auth')

const studiesController = require('../../controllers/treatments/studies')

router
.get('/', studiesController.getAll)
.get('/:id', studiesController.getTreatStudies)
.post('/', isAuth, studiesController.add)
.patch('/:id', isAuth, studiesController.update)
.delete('/:id', isAuth, studiesController.delete)
.delete('/delete/multiple', isAuth, studiesController.deleteMultiple)

module.exports = router