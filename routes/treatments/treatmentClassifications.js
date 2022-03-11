const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/auth')

const treatmentClassificationsController = require('../../controllers/treatments/treatmentClassifications')

router
.get('/', treatmentClassificationsController.getAll)
.get('/:id', treatmentClassificationsController.getOne)
.post('/', isAuth, treatmentClassificationsController.add)
.patch('/:id', isAuth, treatmentClassificationsController.update)
.delete('/:id', isAuth, treatmentClassificationsController.delete)

module.exports = router