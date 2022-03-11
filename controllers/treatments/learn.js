const Learn = require('../../models/treatment/Learn')
const Treatment = require('../../models/treatment/Treatment')
const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all links
exports.getAll = async (req, res) => {
  const categories = await Learn.findAll({
    include: [{
      model: Treatment,
      attributes: ['name'],
    }]
  })
  res.send({data: categories})
}

// * Get all links belonging to a single treatment
exports.getTreatLinks = async (req, res, next) => {
  try {
    let links = await Learn.findAll({where:[{treatment_id: req.params.id}]})
    if (!links) throw new ResourceNotFoundError('Resource not found')
    res.send(links)
  } catch (err){
    next(err)
  }
}

//Add a new learn
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newLearn = await Learn.bulkCreate(req.body)
    res.status(201).send({data: newLearn})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const treat_id = req.body[0].treatment_id
    await Learn.destroy({ where: {treatment_id: treat_id}})
    let updatedLinks = await Learn.bulkCreate(req.body)
    res.send({data: updatedLinks})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {treatment_id} = req.body
    const learn = await Learn.destroy({where: [{treatment_id}]})
    if (!learn) throw new ResourceNotFoundError(`Resource not found`)
    res.send({data: learn})
  } catch (err) {
    next(err)
  }
}