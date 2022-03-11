const Treatment = require('../../models/treatment/Treatment')
const User = require('../../models/User')
const Category = require('../../models/Category')
const Learn = require('../../models/treatment/Learn')
const Video = require('../../models/treatment/Video')
const fs = require('fs')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all treatments
exports.getAll = async (req, res) => {
  const treatments = await Treatment.findAll({
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: Learn,
        attributes: ['id', 'link', 'name', 'language', 'nationality', 'is_app']
      },
      {
        model: Video,
        attributes: ['id', 'link', 'name', 'language']
      },
      {
        model: Category,
        attributes: ['id']
      }
    ]
  })
  res.send(treatments)
}

exports.getSome = async(req, res) => {
  const treatments = await Treatment.findAll({
    where: {id: req.body},
    attributes: ['name']
  })
  res.send(treatments)
}

// Get a treatment
exports.getOne = async (req, res, next) => {
  try {
    const treatment = await Treatment.findOne({where: {id: req.params.id}})
    if (!treatment) throw new ResourceNotFoundError(`We could not find a treatment with id: ${req.params.id}`)
    res.send({data: treatment})
  } catch (err){
    next(err)
  }
}

//Add new treatment
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let treat = req.body

    req.body.image !== 'undefined' 
      ? treat.image = req.file.path 
      : treat.image = ''

    let newTreatment = await Treatment.create(treat)
    res.status(201).send(newTreatment)
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const treatment = await Treatment.findByPk(req.params.id)

    let treat = {...otherAttributes}
    if(req.file) {
      treat.image = req.file.path
      if(treatment.dataValues.image !== "") fs.unlinkSync(`./${treatment.dataValues.image}`)
    }
    await treatment.update(treat)
    if (!treatment) throw new ResourceNotFoundError(`We could not find a treatment with id: ${req.params.id}`)
    res.send(treatment)
  } catch (err) {
    next(err)
  }
}

exports.updateOrder = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const treatments = req.body
    await bulkCreate(treatments, { updateOnDuplicate: ["id"] })
    res.send(treatments)
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const treatment = await Treatment.findByPk(req.params.id)
    await Treatment.destroy({where: [{id: req.params.id,}]})
    if(treatment.dataValues.image !== "") fs.unlinkSync(`./${treatment.dataValues.image}`)
    if (!treatment) throw new ResourceNotFoundError(`We could not find a treatment with id: ${req.params.id}`)
    res.send({data: treatment})
  } catch (err) {
    next(err)
  }
}