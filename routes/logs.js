const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const logsController = require('../controllers/logs')

router
.get('/', isAuth, logsController.getAll)
.get('/:id', isAuth, logsController.getUserLogs)
.post('/', isAuth, logsController.add)
.patch('/:id', isAuth, logsController.update)

module.exports = router