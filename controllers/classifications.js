const Classification = require('../models/Classification')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all medication classifications
exports.getAll = async (req, res) => {
  const classifications = await Classification.findAll()
  res.send({data: classifications})
}

// Get a medication classification
exports.getOne = async (req, res, next) => {
  try {
    const classification = await Classification.findOne({where: {id: req.params.id}})
    if (!classification) throw new ResourceNotFoundError(`We could not find a classification with id: ${req.params.id}`)
    res.send({data: classification})
  } catch (err){
    next(err)
  }
}

//Add new medication classification
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newClassification = await Classification.create(req.body)
    res.status(201).send({data: newClassification})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const classification = await Classification.findByPk( req.params.id)
    classification.update(otherAttributes)
    if (!classification) throw new ResourceNotFoundError(`We could not find a classification with id: ${req.params.id}`)
    res.send({data: classification})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const classification = await Classification.destroy({where: [{id: req.params.id}]})
    if (!classification) throw new ResourceNotFoundError(`We could not find a classification with id: ${req.params.id}`)
    res.send({data: classification})
  } catch (err) {
    next(err)
  }
}