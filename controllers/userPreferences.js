const User = require('../models/User')
const Category = require('../models/Category')
require('../models/UserPreference')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get preferences belonging to a user
exports.getPrefs = async(req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    let userPrefs = await user.getPref({ include: [{
      model: Category,
      attributes: ['id', 'name', 'fr_name']
    }]})
    if (!userPrefs) throw new ResourceNotFoundError(`We could not find preferences for the current user`)
    res.status(201).send(userPrefs)
  } catch (err) {
    next(err)
  }
}

//Add new user preference
exports.add = async(req, res, next) => {
  const {sliders} = req.body
  try {
    let user = await User.findByPk(req.user.id)
    sliders.forEach(async slider =>  await user.addPref(slider.id, {through: {value: slider.value}}))
    res.status(201).send({data: "user preferences added"})
  } catch (err) {
    next(err)
  }
}