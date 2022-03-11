const TreatmentText = require('../models/TreatmentText')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get treatment text of a user
exports.getRecord = async (req, res, next) => {
  try {
    const treatmentText = await TreatmentText.findOne({where: {user_id: req.user.id}})
    if (!treatmentText) throw new ResourceNotFoundError(`We could not find a treatment text for the current user`)
    res.send(treatmentText)
  } catch (err){
    next(err)
  }
}

//Add new treatment text for user
exports.add = async (req, res, next) => {
  req.sanitizedBody.user_id = req.user.id
  try {
    let newTreatmentText = await TreatmentText.findOne({
      where: {user_id: req.user.id}
    })
    if(newTreatmentText) {
      newTreatmentText = await TreatmentText.update(req.sanitizedBody,{
        where: {user_id: req.user.id}
      })
    } else {
      newTreatmentText = await TreatmentText.create(req.sanitizedBody)
    }
  
    res.status(201).send({data: newTreatmentText})
  } 
  catch (err) {
    next(err)
  }
}