const PainLevel = require('../models/PainLevel')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all users pain levels
exports.getAll = async(req, res) => {
  PainLevel.findAll()
    .then(pain_levels => res.send({data: pain_levels}))
    .catch(err => console.log(err))
}

// Get pain level of a user
exports.getRecord = async (req, res, next) => {
  try {
    const userPainLevel = await PainLevel.findOne({
      where: {
       user_id: req.user.id,
      }
    })
    if (!userPainLevel) throw new ResourceNotFoundError('Resource not found for current user')
    
    res.send({data: userPainLevel})
  } catch (err){
    next(err)
  }
}

//Add new pain level row for logged in user
exports.add = async(req, res, next) => {
  let {id} = req.user
  req.body.user_id = id
  try {
    let newPainLevel = await PainLevel.findOne({
      where: {user_id: id}
    })
    if(newPainLevel) {
      newPainLevel = await PainLevel.update(req.body,{
        where: {user_id: id}
      })
    } else {
      newPainLevel = await PainLevel.create(req.body)
    }
    res.status(201).send({data: newPainLevel})
  } 
  catch (err) {
    next(err)
  }
}