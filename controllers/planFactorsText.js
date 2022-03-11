const PlanFactorsText = require('../models/PlanFactorsText')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get plan factor text of a user
exports.getRecord = async (req, res, next) => {
  try {
    const planFactorsText = await PlanFactorsText.findOne({where: {user_id: req.user.id}})
    if (!planFactorsText) throw new ResourceNotFoundError(`We could not find a factor text for the current user`)
    res.send(planFactorsText)
  } catch (err){
    next(err)
  }
}

//Add new plan factor text for user
exports.add = async (req, res, next) => {
  req.sanitizedBody.user_id = req.user.id
  try {
    let newPlanFactorsText = await PlanFactorsText.findOne({
      where: {user_id: req.user.id}
    })
    if(newPlanFactorsText) {
        newPlanFactorsText = await PlanFactorsText.update(req.sanitizedBody,{
        where: {user_id: req.user.id}
      })
    } else {
        newPlanFactorsText = await PlanFactorsText.create(req.sanitizedBody)
    }
  
    res.status(201).send({data: newPlanFactorsText})
  } 
  catch (err) {
    next(err)
  }
}