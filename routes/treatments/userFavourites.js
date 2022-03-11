const express = require('express')
const router = express.Router()
const isAuth = require("../../middleware/auth")

const userFavouritesController = require('../../controllers/treatments/userFavourites')

router
.get('/', isAuth, userFavouritesController.getAll)
.get('/user', isAuth, userFavouritesController.get)
.post('/', isAuth, userFavouritesController.add)
.delete('/', isAuth, userFavouritesController.delete)

module.exports = router