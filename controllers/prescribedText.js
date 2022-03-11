const PrescribedText = require('../models/PrescribedText')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get prescribed text of a user
exports.getRecord = async (req, res, next) => {
  try {
    const prescribedText = await PrescribedText.findOne({where: {user_id: req.user.id}})
    if (!prescribedText) throw new ResourceNotFoundError(`We could not find a factor with id: ${req.params.id}`)
    res.send(prescribedText)
  } catch (err){
    next(err)
  }
}

// Add new prescribed text for user
exports.add = async (req, res, next) => {
  req.sanitizedBody.user_id = req.user.id
  try {
    let newPrescribedText = await PrescribedText.findOne({
      where: {user_id: req.user.id}
    })
    if(newPrescribedText) {
      newPrescribedText = await PrescribedText.update(req.sanitizedBody,{
        where: {user_id: req.user.id}
      })
    } else {
      newPrescribedText = await PrescribedText.create(req.sanitizedBody)
    }
    res.status(201).send({data: newPrescribedText})
  } 
  catch (err) {
    next(err)
  }
}