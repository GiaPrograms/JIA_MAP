const express = require('express')
const router = express.Router()

const authController = require('../../controllers/auth')
const sanitizeBody = require('../../middleware/sanitizeBody')
const authorize = require('../../middleware/auth')

router
.get('/users', authorize, authController.getAll)
.get('/users/usersData', authorize, authController.getUsersData)
.get('/users/:id', authorize, authController.getOne)
.get('/users/current/me', authorize, authController.me)
.post('/users', authorize, authController.add)
.post('/tokens', sanitizeBody, authController.login)
.get('/logout', authorize, authController.logout)
.patch('/users/:id', authorize, authController.edit)
.delete('/users/:id', authorize, authController.delete)

module.exports = router