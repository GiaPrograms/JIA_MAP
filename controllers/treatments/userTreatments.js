const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')

// Get treatments belonging to a user
exports.get = async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userTreatments = await user.getTreatments()
    if (!userTreatments) throw new ResourceNotFoundError('Resource not found')
    res.status(201).send({data: userTreatments})
  } catch (error) {
    next(err)
  }
}

//Add new user treatment
exports.add = async (req, res, next) => {
  try {
    const {selectedTreatments} = req.body
    const user = await User.findByPk(req.user.id)
    if(selectedTreatments.length) await selectedTreatments.forEach(treatment => user.addTreatment(treatment.id))
    const userTreatments = await user.getTreatments()
    const deselectedTreats = await userTreatments.filter(userTreat => !selectedTreatments.some(selectedTreat => userTreat.id === selectedTreat.id))
    await deselectedTreats.forEach(treat => user.removeTreatment(treat.dataValues.id))
    res.status(201).send({data:"User treatment added"})
  } catch (err) {
    next(err)
  }
}