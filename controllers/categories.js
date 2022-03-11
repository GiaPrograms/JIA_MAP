const Category = require('../models/Category')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all categories
exports.getAll = async(req, res) => {
  const categories = await Category.findAll({attributes: ['id', 'name']})
  res.send(categories)
}

// Get a category
exports.getOne = async(req, res, next) => {
  try {
    let category = await Category.findByPk(req.params.id)
    if (!category) throw new ResourceNotFoundError(`We could not find a category with id: ${req.params.id}`)
    res.send({data: category})
  } catch (err){
    next(err)
  }
}

//Add a new category
exports.add = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newCategory = await Category.create(req.body)
    res.status(201).send({data: newCategory})
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const category = await Category.findByPk(req.params.id)
    category.update(otherAttributes)
    if (!category) throw new ResourceNotFoundError(`We could not find a category with id: ${req.params.id}`)
    res.send({data: category})
  } catch (err) {
    next(err)
  }
}

exports.delete = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const category = await Category.destroy({where: [{id: req.params.id}]})
    if (!category) throw new ResourceNotFoundError(`We could not find a category with id: ${req.params.id}`)
    res.send({data: category})
  } catch (err) {
    next(err)
  }
}