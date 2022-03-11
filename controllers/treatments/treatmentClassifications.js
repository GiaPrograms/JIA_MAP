const TreatmentClassification = require('../../models/treatment/TreatmentClassification')
const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all treatment classifications
exports.getAll = async (req, res) => {
  const treatmentClassifications = await TreatmentClassification.findAll()
  res.send(treatmentClassifications)
}

// Get a treatment classification
exports.getOne = async (req, res, next) => {
  try {
    const treatmentClassification = await TreatmentClassification.findOne({where: {id: req.params.id}})
    if (!treatmentClassification) throw new ResourceNotFoundError('Resource not found')
    res.send(treatmentClassification)
  } catch (err){
    next(err)
  }
}

//Add new treatment classification
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newTreatmentClassification = await TreatmentClassification.create(req.body)
    res.status(201).send({data: newTreatmentClassification})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const treatClass = await TreatmentClassification.findByPk(req.params.id)
    treatClass.update(otherAttributes)
    if (!factor) throw new ResourceNotFoundError(`We could not find a treatment classification with id: ${req.params.id}`)
    res.send({data: treatClass})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const treatClass = await TreatmentClassification.destroy({where: [{id: req.params.id}]})
    if (!treatClass) throw new ResourceNotFoundError(`We could not find a treatment classification with id: ${req.params.id}`)
    res.send({data: treatClass})
  } catch (err) {
    next(err)
  }
}