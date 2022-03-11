const Treatment = require('../models/treatment/Treatment')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all categories belonging to a treatment
exports.getAll = async(req, res, next) => {
  try {
    let treatment = await Treatment.findByPk(req.params.id)
    let treatmentCat = await treatment.getCategories({attributes:['id','name']})
    if (!treatmentCat) throw new ResourceNotFoundError(`We could not find treatment with id: ${req.params.id}`)
    res.status(201).send(treatmentCat)
  } catch (error) {
    next(err)
  }
}

// Add new treatment category
exports.adjust = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {treatment_id, selectedCategories} = req.body
    let treatment = await Treatment.findByPk(treatment_id)
    if(selectedCategories.length) await selectedCategories.forEach(category => treatment.addCategory(category.id))
    const treatCategories = await treatment.getCategories()
    const deselectedCategories = await treatCategories.filter(treatCat => !selectedCategories.some(selectedCat => treatCat.id === selectedCat.id))
    await deselectedCategories.forEach(cat => treatment.removeCategory(cat.dataValues.id))
    res.status(201).send("Treatment category added")
  } catch (err) {
    next(err)
  }
}