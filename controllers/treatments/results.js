const Result = require('../../models/treatment/Result')
const Study = require('../../models/treatment/Study')
const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all results
exports.getAll = async (req, res) => {
  const results = await Result.findAll({
    include: [{
      model: Study,
      attributes: ['id','name'],
    }]
  })
  res.send({data: results})
}

// * Get all results belonging to a study
exports.getStudyResults = async (req, res, next) => {
  try {
    let results = await Result.findAll({where:[{study_id: req.params.id}]})
    if (!results) throw new ResourceNotFoundError('Resource not found')
    res.send(results)
  } catch (err){
    next(err)
  }
}

//Add a new result
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newResult = await Result.create(req.body)
    res.status(201).send({data: newResult})
  } catch (err) {
    next(err)
  }
}

exports.addMultiple = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newResult = await Result.bulkCreate(req.body)
    res.status(201).send({data: newResult})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const result = await Result.findByPk(req.params.id)
    result.update(otherAttributes)
    if (!result) throw new ResourceNotFoundError(`We could not find a result with id: ${req.params.id}`)
    res.send({data: result})
  } catch (err) {
    next(err)
  }
}

exports.updateMultiple = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const study_id = req.body[0].study_id
    await Result.destroy({where: {study_id}})
    let result = await Result.bulkCreate(req.body)
    if (!result) throw new ResourceNotFoundError('Resource not found')
    res.send({data: result})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const result = await Result.destroy({where: [{id: req.params.id}]})
    if (!result) throw new ResourceNotFoundError(`We could not find a result with id: ${req.params.id}`)
    res.send({data: result})
  } catch (err) {
    next(err)
  }
}

exports.deleteMultiple = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {study_id} = req.body
    const result = await Result.destroy({where: [{study_id}]})
    if (!result) throw new ResourceNotFoundError(`We could not find requested result(s)`)
    res.send({data: result})
  } catch (err) {
    next(err)
  }
}