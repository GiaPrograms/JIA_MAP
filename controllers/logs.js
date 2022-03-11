const Log = require('../models/Log')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all logs
exports.getAll = async(req, res) => {
  const logs = await Log.findAll()
  res.send(logs)
}

// Get logs belonging to a user
exports.getUserLogs = async(req, res, next) => {
  try {
    const logs = await Log.findAll({where: {user_id: req.params.id}})
    if (!logs) throw new Error('Resource not found')
    res.send(logs)
  } catch (err){
    next(err)
  }
}

// Add a new user log
exports.add = async(req, res, next) => {
  try {
    req.body.user_id = req.user.id
    const newLog = await Log.create(req.body)
    res.status(201).send(newLog)
  } catch (err) {
    next(err)
  }
}

// update a user log
exports.update = async(req, res, next) => {
  try {
    const log = await Log.findByPk(req.params.id)
    if(log.dataValues.user_id !== req.user.id) throw new Error('Invalid user')
    log.update(req.body)
    if (!log) throw new ResourceNotFoundError(`We could not find a log with id: ${req.params.id}`)
    res.send(log)
  } catch (err) {
    next(err)
  }
}