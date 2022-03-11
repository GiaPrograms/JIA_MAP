const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const confidenceController = require('../controllers/confidence')

router.get('/', isAuth, confidenceController.getAll)
router.get('/user', isAuth, confidenceController.getRecord)
router.post('/', isAuth, confidenceController.add)

module.exports = router