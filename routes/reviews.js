const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const reviewsController = require('../controllers/reviews')

router
.get('/', isAuth, reviewsController.getAll)
.get('/user', isAuth, reviewsController.getOne)
.post('/', isAuth, reviewsController.add)

module.exports = router