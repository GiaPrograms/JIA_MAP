const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/auth')

const resultsController = require('../../controllers/treatments/results')

router
.get('/', resultsController.getAll)
.get('/:id', resultsController.getStudyResults)
.post('/', isAuth, resultsController.add)
.post('/add/multiple', isAuth, resultsController.addMultiple)
.patch('/:id', isAuth, resultsController.update)
.patch('/update/multiple', isAuth, resultsController.updateMultiple)
.delete('/:id', isAuth, resultsController.delete)
.delete('/delete/multiple', isAuth, resultsController.deleteMultiple)

module.exports = router