const User = require('../../models/User')
const Study = require('../../models/treatment/Study')
const Result = require('../../models/treatment/Result')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')

// Get user HCPs
exports.get = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    const userHCPs = await user.getHcp({include: [{model: Study, include: [Result] }]})
    if (!userHCPs) throw new ResourceNotFoundError('Resource not found')
    res.send(userHCPs)
  } catch (error) {
    next(err)
  }
}

//Add / replace user HCP
exports.add = async (req, res, next) => {
  let treatmentsId = req.body
  try {
    let user = await User.findByPk(req.user.id)
    const userHcp = await user.getHcp({raw: true})
    const hcpIds = await userHcp.map(hcp => hcp.id)
    await user.removeHcp(hcpIds)
    await user.addHcp(treatmentsId)
    res.status(201).send({data:"User HCP added"})
  } catch (err) {
    next(err)
  }
}