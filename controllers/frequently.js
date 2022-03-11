const Frequently = require('../models/Frequently')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all
exports.getAll = async(req, res) => {
  const frequently = await Frequently.findAll()
  res.send({data: frequently})
}

// Get record of selected user
exports.getOne = async(req, res, next) => {
  try {
    let userFrequently = await User.findByPk(req.user.id, {
      attributes: ['username'],
      include: [{
        model: Frequently,
      }]
    })
    if (!userFrequently) throw new ResourceNotFoundError(`We could not find data for the current user`)
    res.status(201).send({data: userFrequently})
  } catch (error) {
    next(err)
  }
}

//Add new
exports.add = async(req, res, next) => {
  try {
    let frequently = await Frequently.findOne({
      where: {user_id: req.user.id}
    })
    if(frequently) {
      frequently = await Frequently.update(req.body,{
        where: {user_id: req.user.id}
      })
    } else {
      req.body.user_id = req.user.id
      frequently = await Frequently.create(req.body)
    }
   
    res.status(201).send({data: frequently})
  } catch (err) {
    next(err)
  }
}