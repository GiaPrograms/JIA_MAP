const Video = require('../../models/treatment/Video')
const Treatment = require('../../models/treatment/Treatment')
const User = require('../../models/User')
const ResourceNotFoundError = require('../../exceptions/ResourceNotFound')
const ForbiddenError = require('../../exceptions/Forbidden')

// Get all videos
exports.getAll = async (req, res) => {
  const videos = await Video.findAll({
    include: [{
      model: Treatment,
      attributes: ['name'],
    }]
  })
  res.send({data: videos})
}

// * Get all videos belonging to a single treatment
exports.getTreatVideos = async (req, res, next) => {
  try {
    let videos = await Video.findAll({where:[{treatment_id: req.params.id}]})
    if (!videos) throw new ResourceNotFoundError('Resource not found')
    res.send(videos)
  } catch (err){
    next(err)
  }
}

//Add a new video
exports.add = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    let newVideo = await Video.bulkCreate(req.body)
    res.status(201).send({data: newVideo})
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const treat_id = req.body[0].treatment_id
    await Video.destroy({ where: {treatment_id: treat_id}})
    let updatedVideo = await Video.bulkCreate(req.body)
    if (!updatedVideo) throw new ResourceNotFoundError(`We could not find a video with id: ${req.params.id}`)
    res.send({data: updatedVideo})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    console.log(req.params
      )
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {treatment_id} = req.body
    const video = await Video.destroy({where: [{treatment_id}]})
    if (!video) throw new ResourceNotFoundError(`We could not find a video with id: ${req.params.id}`)
    res.send({data: video})
  } catch (err) {
    next(err)
  }
}