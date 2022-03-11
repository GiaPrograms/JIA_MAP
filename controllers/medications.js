const Medication = require('../models/Medication')
const Classification = require('../models/Classification')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all medications
exports.getAll = async(req, res) => {
  const medications = await Medication.findAll({
    include: ({
      model: Classification,
      attributes: ['name', 'section']
    })
  })
  res.send({data: medications})
}

// Get a medication
exports.getOne = async(req, res, next) => {
  try {
    const medication = await Medication.findOne({where: {id: req.params.id}})
    if (!medication) throw new ResourceNotFoundError(`We could not find a medication with id: ${req.params.id}`)
    res.send({data: medication})
  } catch (err){
    next(err)
  }
}

//Add new medication
exports.add = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newMedication = await Medication.create(req.body)
    res.status(201).send({data: newMedication})
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const med = await Medication.findByPk(req.params.id)
    med.update(otherAttributes)
    if (!med) throw new ResourceNotFoundError(`We could not find a medication with id: ${req.params.id}`)
    res.send({data: med})
  } catch (err) {
    next(err)
  }
}


exports.delete = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const medication = await Medication.destroy({where: [{id: req.params.id}]})
    if (!medication) throw new ResourceNotFoundError(`We could not find a medication with id: ${req.params.id}`)
    res.send({data: medication})
  } catch (err) {
    next(err)
  }
}