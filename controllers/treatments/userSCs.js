const User = require('../../models/User')
const Study = require('../../models/treatment/Study')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')

// Get user SCs
exports.get = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userSCs = await user.getSc({include: [Study]})
    if(!userSCs) throw new ResourceNotFoundError('Resource not found')
    res.send(userSCs)
  } catch (error) {
    next(err)
  }
}

//Add / replace user SC
exports.add = async (req, res, next) => {
  const treatmentsId = req.body
  try {
    let user = await User.findByPk(req.user.id)
    const userSc = await user.getSc({raw: true})
    const scIds = await userSc.map(sc => sc.id)
    await user.removeSc(scIds)
    await user.addSc(treatmentsId)
    res.status(201).send({data:"User SC added"})
  } catch (err) {
    next(err)
  }
}