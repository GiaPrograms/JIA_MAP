const PainArea = require('../models/PainArea')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all users pain areas
exports.getAll = async(req, res) => {
  PainArea.findAll()
    .then(pain_areas => res.send({data: pain_areas}))
    .catch(err => console.log(err))
}

exports.findAndCount = async(req, res, next) => {
  try {
    const area = req.params.area
    const {count} = await PainArea.findAndCountAll({where: {[area]: true}})
    res.send({name: req.params.area, count: count})
  }  catch (err){
    next(err)
  }
}

// Get pain areas of a user
exports.getRecord = async (req, res, next) => {
  try {
    const userPainAreas = await PainArea.findOne({
      where: {
       user_id: req.user.id,
      },
      attributes: ['ankles', 'elbows', 'hips', 'jaw','knees', 'lower_back', 'shoulders', 'wrists','neck','fingers','toes']
    })
    if (!userPainAreas) throw new ResourceNotFoundError('Resource not found for current user')
    res.send({data: userPainAreas})
  } catch (err){
    next(err)
  }
}

//Add new pain areas row for logged in user
exports.add = async (req, res, next) => {
  let {pain_areas} = req.body
  let userAreas = {user_id: req.user.id, ...pain_areas}
  try {
    let newPainAreas = await PainArea.findOne({
      where: {user_id: req.user.id}
    })
    if(newPainAreas) {
      newPainAreas = await PainArea.update(userAreas,{
        where: {user_id: req.user.id}
      })
    } else {
      newPainAreas = await PainArea.create(userAreas)
    }
    res.status(201).send({data: newPainAreas})
  } 
  catch (err) {
    next(err)
  }
}