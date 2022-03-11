const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get factors belonging to a user
exports.get = async(req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id) 
    const userFactors = await user.getFactors({attributes: ['id', 'title', 'description', 'fr_title', 'fr_description']})
    if (!userFactors) throw new ResourceNotFoundError(`We could not find factors for the current user`)
    res.status(201).send(userFactors)
  } catch (error) {
    next(err)
  }
}

//Add new user factor
exports.add = async(req, res, next) => {
  try {
    const {selectedFactors} = req.body
    const user = await User.findByPk(req.user.id)
    if(selectedFactors.length) await selectedFactors.forEach(factor => user.addFactor(factor.id))
    const userFactors = await user.getFactors()
    const deselectedFactors = await userFactors.filter(userFactor => !selectedFactors.some(selectedFactor => userFactor.id === selectedFactor.id))
    await deselectedFactors.forEach(factor => user.removeFactor(factor.dataValues.id))
    res.status(201).send({data: "User factor(s) added"})
  } catch (err) {
    next(err)
  }
}