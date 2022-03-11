const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/auth')

const vidoesController = require('../../controllers/treatments/videos')

router
.get('/', vidoesController.getAll)
.get('/:id', vidoesController.getTreatVideos)
.post('/', isAuth, vidoesController.add)
.patch('/', isAuth, vidoesController.update)
.delete('/', isAuth, vidoesController.delete)

module.exports = router