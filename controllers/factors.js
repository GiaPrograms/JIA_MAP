const Factor = require('../models/Factor')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all factors
exports.getAll = async(req, res) => {
  const factors = await Factor.findAll()
  res.send(factors)
}

// Get a factor
exports.getOne = async(req, res, next) => {
  try {
    const factor = await Factor.findOne({where: {id: req.params.id}})
    if (!factor) throw new ResourceNotFoundError(`We could not find a factor with id: ${req.params.id}`)
    res.send({data: factor})
  } catch (err){
    next(err)
  }
}

//Add new factor
exports.add = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newFactor = await Factor.create(req.body)
    res.status(201).send({data: newFactor})
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const factor = await Factor.findByPk(req.params.id)
    factor.update(otherAttributes)
    if (!factor) throw new ResourceNotFoundError(`We could not find a factor with id: ${req.params.id}`)
    res.send({data: factor})
  } catch (err) {
    next(err)
  }
}

exports.delete = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const factor = await Factor.destroy({where: [{id: req.params.id}]})
    if (!factor) throw new ResourceNotFoundError(`We could not find a factor with id: ${req.params.id}`)
    res.send({data: factor})
  } catch (err) {
    next(err)
  }
}