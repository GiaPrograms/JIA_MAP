const Study = require('../../models/treatment/Study')
const Treatment = require('../../models/treatment/Treatment')
const Result = require('../../models/treatment/Result')
const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all studies
exports.getAll = async (req, res) => {
  const studies = await Study.findAll({
    include: [
      {
        model: Treatment,
        attributes: ['name']
      },
      {
        model: Result,
        attributes: ['name', 'statistics', 'score']
      }
    ]
  })
  res.send({data: studies})
}

// * Get all studies belonging to a single treatment
exports.getTreatStudies = async (req, res, next) => {
  try {
    let studies = await Study.findAll({where:[{treatment_id: req.params.id}]})
    if (!studies) throw new ResourceNotFoundError('Resource not found')
    res.send(studies)
  } catch (err){
    next(err)
  }
}

//Add new study
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newStudy = await Study.create(req.body)
    res.status(201).send({data: newStudy})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const study = await Study.findByPk(req.params.id)
    study.update(otherAttributes)
    if (!study) throw new ResourceNotFoundError(`We could not find a study with id: ${req.params.id}`)
    res.send({data: study})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const study = await Study.destroy({where: [{id: req.params.id}]})
    if (!study) throw new ResourceNotFoundError(`We could not find a study with id: ${req.params.id}`)
    res.send({data: study})
  } catch (err) {
    next(err)
  }
}

exports.deleteMultiple = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {treatment_id} = req.body
    const study = await Study.destroy({where: [{treatment_id}]})
    if (!study) throw new ResourceNotFoundError(`We could not find requested study(s)`)
    res.send({data: study})
  } catch (err) {
    next(err)
  }
}