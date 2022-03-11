const Category = require('../../models/Category')
const User = require('../../models/User')
const Treatment = require('../../models/treatment/Treatment')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')

exports.getAll = async(req, res) => {
  const userFavourites = await User.findAll({ include: {
    model: Treatment,
    as: 'favourite',
    attributes: ['name']
  }})
  res.send(userFavourites)
}

// Get favourites belonging to a user
exports.get = async(req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userFavourites = await user.getFavourite({include: [Category]})
    if (!userFavourites) throw new ResourceNotFoundError('Resource not found')
    res.status(201).send(userFavourites)
  } catch (error) {
    next(err)
  }
}

//Add a new user favourite
exports.add = async(req, res, next) => {
  let {treatment_id} = req.body
  try {
    let user = await User.findByPk(req.user.id)
    await user.addFavourite(treatment_id)
    res.status(201).send({data:"User favourite added"})
  } catch (err) {
    next(err)
  }
}

// Delete a user favourite
exports.delete = async (req, res, next) => {
  let {treatment_id} = req.body
  try {
    let user = await User.findByPk(req.user.id)
    const favourite = await user.removeFavourite(treatment_id)
    if (!favourite) throw new ResourceNotFoundError(`We could not find a user with id: ${req.user.id} or treatment with id: ${treatment_id}`)
    res.send({data: favourite})
  } catch (err) {
    next(err)
  }
}