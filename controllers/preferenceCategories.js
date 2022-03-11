const Preference = require('../models/Preference')
const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all categories belonging to a preference
exports.getAll = async (req, res, next) => {
  try {
    let pref = await Preference.findByPk(req.params.id)
    let prefCat = await pref.getCategories({
      attributes:['id','name','fr_name']
    })
    if (!prefCat) throw new ResourceNotFoundError(`We could not find a preference with id: ${req.params.id}`)
    res.status(201).send(prefCat)
  } catch (error) {
    next(err)
  }
}

// Adjust preference categories
exports.adjust = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {preference_id, selectedCategories} = req.body
    let pref = await Preference.findByPk(preference_id)
    if(selectedCategories.length) await selectedCategories.forEach(category => pref.addCategory(category.id))
    const prefCategories = await pref.getCategories()
    const deselectedCategories = await prefCategories.filter(prefCat => !selectedCategories.some(selectedCat => prefCat.id === selectedCat.id))
    await deselectedCategories.forEach(cat => pref.removeCategory(cat.dataValues.id))
    res.status(201).send("Preference category added")
  } catch (err) {
    next(err)
  }
}