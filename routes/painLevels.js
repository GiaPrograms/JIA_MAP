const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')

const painLevelsController = require('../controllers/painLevels')

router.get('/', isAuth, painLevelsController.getAll)
router.get('/user', isAuth, painLevelsController.getRecord)
router.post('/', isAuth, painLevelsController.add)

module.exports = router