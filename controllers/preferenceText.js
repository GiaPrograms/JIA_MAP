const PreferenceText = require('../models/PreferenceText')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get preference text of a user
exports.getRecord = async(req, res, next) => {
  try {
    const preferenceText = await PreferenceText.findOne({where: {user_id: req.user.id}})
    if (!preferenceText) throw new ResourceNotFoundError(`We could not find a preference for the current user`)
    res.send(preferenceText)
  } catch (err){
    next(err)
  }
}

//Add new preference text for user
exports.add = async (req, res, next) => {
  try {
    let newPreferenceText = await PreferenceText.findOne({
      where: {user_id: req.user.id}
    })
    if(newPreferenceText) {
      newPreferenceText = await PreferenceText.update(req.sanitizedBody,{
        where: {user_id: req.user.id}
      })
    } else {
      req.sanitizedBody.user_id = req.user.id
      newPreferenceText = await PreferenceText.create(req.sanitizedBody)
    }
    res.status(201).send({data: newPreferenceText})
  } 
  catch (err) {
    next(err)
  }
}