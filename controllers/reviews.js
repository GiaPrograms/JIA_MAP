const Review = require('../models/Review')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')

// Get all review
exports.getAll = async(req, res) => {
  const reviews = await Review.findAll()
  res.send({data: reviews})
}

// Get review belonging to a user
exports.getOne = async(req, res, next) => {
  try {
    const userReview = await Review.findOne({
      where: [{user_id: req.user.id}],
      attributes: ['selection']
    })
    if (!userReview) throw new ResourceNotFoundError('Resource not found for current user')
    res.send(userReview)
  } catch (err){
    next(err)
  }
}

// Add new review for a user
exports.add = async(req, res, next) => {
  try {
    let newReview = await Review.findOne({
      where: {user_id: req.user.id}
    })
    if(newReview) {
      newReview = await Review.update(req.body,{
        where: {user_id: req.user.id}
      })
    } else {
      req.body.user_id = req.user.id
      newReview = await Review.create(req.body)
    }
    res.status(201).send({data: newReview})
  } catch (err) {
    next(err)
  }
}