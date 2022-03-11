const Motivation = require('../models/Motivation')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all users motivation level
exports.getAll = async (req, res) => {
  Motivation.findAll()
    .then(motivation => res.send({data: motivation}))
    .catch(err => console.log(err))
}

// Get motivation level of a user
exports.getRecord = async (req, res, next) => {
  try {
    const userMotivation = await Motivation.findOne({where: {user_id: req.user.id}})
    if (!userMotivation) throw new ResourceNotFoundError('Resource not found for current user')
    res.send({data: userMotivation})
  } catch (err){
    next(err)
  }
}

//Add new motivation level for logged in user
exports.add = async (req, res, next) => {
  try {
    let newMotivation = await Motivation.findOne({
      where: {user_id: req.user.id}
    })
    if(newMotivation) {
      newMotivation = await Motivation.update(req.body,{
        where: {user_id: req.user.id}
      })
    } else {
      req.body.user_id = req.user.id
      newMotivation = await Motivation.create(req.body)
    }
    res.status(201).send({data: newMotivation})
  } 
  catch (err) {
    next(err)
  }
}