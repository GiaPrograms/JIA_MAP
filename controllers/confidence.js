const Confidence = require('../models/Confidence')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all users confidence level
exports.getAll = async (req, res) => {
  Confidence.findAll()
    .then(confidence => res.send({data: confidence}))
    .catch(err => console.log(err))
}

// Get confidence level of a user
exports.getRecord = async (req, res, next) => {
  try {
    const userConfidence = await Confidence.findOne({
      where: {
       user_id: req.user.id,
      }
    })
    if (!userConfidence) throw new ResourceNotFoundError('Resource not found for the current user')
    res.send({data: userConfidence})
  } catch (err){
    next(err)
  }
}

//Add new confidence level for logged in user
exports.add = async (req, res, next) => {
  try {
    let newConfidence = await Confidence.findOne({
      where: {user_id: req.user.id}
    })
    if(newConfidence) {
      newConfidence = await Confidence.update(req.body,{
        where: {user_id: req.user.id}
      })
    } else {
      req.body.user_id = req.user.id
      newConfidence = await Confidence.create(req.body)
    }
    res.status(201).send({data: newConfidence})
  } 
  catch (err) {
    next(err)
  }
}