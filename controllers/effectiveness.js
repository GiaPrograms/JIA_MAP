const Effectiveness = require('../models/Effectiveness')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all users effectiveness level
exports.getAll = async (req, res) => {
  Effectiveness.findAll()
    .then(effectiveness => res.send({data: effectiveness}))
    .catch(err => console.log(err))
}

// Get effectiveness level of a user
exports.getRecord = async (req, res, next) => {
  try {
    const userEffectiveness = await Effectiveness.findOne({
      where: {
       user_id: req.user.id,
      }
    })
    if (!userEffectiveness) throw new Error('Resource not found for the current user')
    res.send({data: userEffectiveness})
  } catch (err){
    next(err)
  }
}

//Add new effectiveness level for logged in user
exports.add = async (req, res, next) => {
  try {
    let newEffectiveness = await Effectiveness.findOne({
      where: {user_id: req.user.id}
    })
    if(newEffectiveness) {
      newEffectiveness = await Effectiveness.update(req.body,{
        where: {user_id: req.user.id}
      })
    } else {
      req.body.user_id = req.user.id
      newEffectiveness = await Effectiveness.create(req.body)
    }
    res.status(201).send({data: newEffectiveness})
  } 
  catch (err) {
    next(err)
  }
}