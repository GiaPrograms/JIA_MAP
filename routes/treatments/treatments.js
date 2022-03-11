const express = require('express')
const router = express.Router()
const multer = require('multer')
const isAuth = require('../../middleware/auth')

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' 
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png') {
    cb(null, true) 
  } else {
    cb(null, false)
  }
}

const storage = multer.diskStorage({
  destination: 'uploads',     
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage: storage, 
  limits: {
    fileize: 1024 * 1024 + 5
  },
  fileFilter: fileFilter
})

const treatmentsController = require('../../controllers/treatments/treatments')

router
.get('/', treatmentsController.getAll)
.get('/:id', treatmentsController.getOne)
.post('/', isAuth, upload.single('image'), treatmentsController.add)
.post('/some', isAuth, treatmentsController.getSome)
.patch('/:id', isAuth, upload.single('image'),treatmentsController.update)
.patch('/reorder/list', isAuth, treatmentsController.updateOrder)
.delete('/:id', isAuth, treatmentsController.delete)

module.exports = router