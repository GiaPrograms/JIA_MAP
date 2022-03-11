const Preference = require('../models/Preference')
const Category = require('../models/Category')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all preferences
exports.getAll = async(req, res) => {
  const preferences = await Preference.findAll({include: [Category]})
  res.send(preferences)
}

// Get a preference
exports.getOne = async(req, res, next) => {
  try {
    const preference = await Preference.findOne({where: {id: req.params.id}})
    if (!preference) throw new ResourceNotFoundError(`We could not find a preference with id: ${req.params.id}`)
    res.send({data: preference})
  } catch (err){
    next(err)
  }
}

//Add new preference
exports.add = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newPreference = await Preference.create(req.body)
    res.status(201).send(newPreference)
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const preference = await Preference.findByPk(req.params.id)
    await preference.update(otherAttributes)
    if (!preference) throw new ResourceNotFoundError(`We could not find a preference with id: ${req.params.id}`)
    res.send(preference)
  } catch (err) {
    next(err)
  }
}

exports.delete = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const preference = await Preference.destroy({where: [{id: req.params.id}]})
    if (!preference) throw new ResourceNotFoundError(`We could not find a preference with id: ${req.params.id}`)
    res.send({data: preference})
  } catch (err) {
    next(err)
  }
}