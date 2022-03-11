const User = require('../models/User')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get suggestions belonging to a user
exports.get = async(req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userSuggestions = await user.getSuggestions({attributes: ['id', 'title', 'description', 'fr_title', 'fr_description']})
    if (!userSuggestions) throw new ResourceNotFoundError(`We could not find suggestions for the current user`)
    res.status(201).send(userSuggestions)
  } catch (error) {
    next(err)
  }
}

//Add new suggestion
exports.add = async(req, res, next) => {
  try {
    const {selectedSuggestions} = req.body
    const user = await User.findByPk(req.user.id)
    if(selectedSuggestions.length) await selectedSuggestions.forEach(sug => user.addSuggestion(sug.id))
    const userSuggestions = await user.getSuggestions()
    const deselectedSuggestions = await userSuggestions.filter(userSug => !selectedSuggestions.some(selectedSug => userSug.id === selectedSug.id))
    await deselectedSuggestions.forEach(sug => user.removeSuggestion(sug.dataValues.id))
    res.status(201).send({data: "User suggestion(s) added"})
  } catch (err) {
    next(err)
  }
}