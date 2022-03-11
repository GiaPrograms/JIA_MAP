const Suggestion = require('../models/Suggestion')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all suggestions
exports.getAll = async(req, res) => {
  const suggestions = await Suggestion.findAll()
  res.send(suggestions)
}

// Get suggestion belonging to a user
exports.getOne = async(req, res, next) => {
  try {
    const suggestion = await Suggestion.findOne({where: {id: req.params.id}})
    if (!suggestion) throw new ResourceNotFoundError('Resource not found for current user')
    res.send({data: suggestion})
  } catch (err){
    next(err)
  }
}

//Add new suggestion
exports.add = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newSuggestion = await Suggestion.create(req.body)
    res.status(201).send({data: newSuggestion})
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const sugg = await Suggestion.findByPk(req.params.id)
    sugg.update(otherAttributes)
    if (!sugg) throw new ResourceNotFoundError(`We could not find a suggestion with id: ${req.params.id}`)
    res.send({data: sugg})
  } catch (err) {
    next(err)
  }
}

exports.delete = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const suggestion = await Suggestion.destroy({where: [{id: req.params.id}]})
    if (!suggestion) throw new ResourceNotFoundError(`We could not find a suggestion with id: ${req.params.id}`)
    res.send({data: suggestion})
  } catch (err) {
    next(err)
  }
}