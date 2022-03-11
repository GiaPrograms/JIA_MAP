const User = require('../../models/User')
const Treatment = require('../../models/treatment/Treatment')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')

exports.getAll = async (req, res) => {
  const userPlans  = await User.findAll({ include: {
    model: Treatment,
    as: 'plan',
    attributes: ['name']
  }})
  res.send(userPlans)
}

// Get treatments in a users plan
exports.get = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userPlans = await user.getPlan()
    if (!userPlans) throw new ResourceNotFoundError('Resource not found')
    res.status(201).send(userPlans)
  } catch (error) {
    next(err)
  }
}

//Add a new treatment to user plan
exports.add = async (req, res, next) => {
  try {
    const {plan} = req.body
    const user = await User.findByPk(req.user.id)
    if(plan.length) await plan.forEach(el => user.addPlan(el.id))
    const userPlan = await user.getPlan()
    const deselectedPlans = await userPlan.filter(userTreat => !plan.some(selectedTreat => userTreat.id === selectedTreat.id))
    await deselectedPlans.forEach(el => user.removePlan(el.dataValues.id))
    res.status(201).send({data:"User plan added"})
  } catch (err) {
    next(err)
  }
}

// Delete a treatment from user plan
exports.delete = async (req, res) => {
  let {treatment_id} = req.body
  try {
    let user = await User.findByPk(req.user.id)
    const plan = await user.removePlan(treatment_id)
    if (!plan) throw new ResourceNotFoundError(`We could not find a user with id: ${req.user.id} or treatment with id: ${treatment_id}`)
    res.send({data: plan})
  } catch (err) {
    next(err)
  }
}