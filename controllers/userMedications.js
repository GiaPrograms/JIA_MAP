const Classification = require('../models/Classification')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get medications belonging to a user
exports.get = async(req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    let userMedications = await user.getMedications({
      include: [Classification]
    })
    if (!userMedications) throw new ResourceNotFoundError(`We could not find medications for the current user`)
    res.status(201).send({data: userMedications})
  } catch (error) {
    next(err)
  }
}

//Add new user medication
exports.add = async(req, res, next) => {
  try {
    const {selectedMeds} = req.body
    const user = await User.findByPk(req.user.id)
    if(selectedMeds.length) await selectedMeds.forEach(med => user.addMedication(med.id))
    const userMedications = await user.getMedications()
    const deselectedMeds = await userMedications.filter(userMed => !selectedMeds.some(selectedMed => userMed.id === selectedMed.id))
    await deselectedMeds.forEach(med => user.removeMedication(med.dataValues.id))
    res.status(201).send({data:"User medication added"})
  } catch (err) {
    next(err)
  }
}