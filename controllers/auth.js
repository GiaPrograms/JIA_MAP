'use strict'
const User = require('../models/User')

const PainLevel = require('../models/PainLevel')
const PainArea = require('../models/PainArea')
const Medication = require('../models/Medication')
const Treatment = require('../models/treatment/Treatment')
const HowOften = require('../models/Frequently')
const Effectiveness = require('../models/Effectiveness')
const Preference = require('../models/Preference')
const Motivation = require('../models/Motivation')
const Confidence = require('../models/Confidence')
const Factor = require('../models/Factor')
const Suggestion = require('../models/Suggestion')
const ResourceNotFoundError = require('../exceptions/ResourceNotFound')
const UnauthorizedError = require('../exceptions/Unauthorized')
const ForbiddenError = require('../exceptions/Forbidden')

// Get all users
exports.getAll = async(req, res) => {
  const currentUser = await User.findByPk(req.user.id)
  if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
  const users = await User.findAll({include: [Suggestion]})
  res.send({data: users})
}

exports.getUsersData = async(req, res, next) => {
  try{
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const usersData = await User.findAll({
      include: [
        {
          model: PainLevel,
          attributes:['level']
        },
        {
          model: PainArea,
          attributes: ['ankles', 'elbows', 'hips', 'jaw', 'knees', 'lower_back', 'shoulders', 'wrists']
        },
        {
          model: Medication,
          attributes: ['name']
        },
        {
          model: Treatment,
          attributes: ['name']
        },
        {
          model: HowOften,
          attributes:['other_treatments', 'prescribed_meds']
        },
        {
          model: Effectiveness,
          attributes:['control_arthritis', 'manage_pain']
        },
        {
          model: Preference,
          as: 'pref',
          attributes: ['description']
        },
        {
          model:  Treatment,
          as: 'plan',
          attributes: ['name']
        },
        {
          model:  Treatment,
          as: 'sc',
          attributes: ['name']
        },
        {
          model:  Treatment,
          as: 'hcp',
          attributes: ['name']
        },
        {
          model: Motivation,
          attributes:['level']
        },
        {
          model: Confidence,
          attributes:['level']
        },
        {
          model: Factor,
          attributes:['title']
        },
        {
          model: Suggestion,
          attributes:['title']
        },
      ]
    })
    res.send(usersData)
  } catch (err) {
    next()
  }

}

exports.getOne = async(req, res, next) => {
  try{
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const user = await User.findByPk(req.params.id)
    if (!user) throw new ResourceNotFoundError(`We could not find a user with id: ${req.params.id}`)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

// Get the currently logged-in user
exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  res.send({ data: user })
}

// Login a user and return an authentication token
exports.login = async (req, res, next) => {
  const { username, password } = req.sanitizedBody
  try {
    const user = await User.authenticate(username, password)
    if (!user) throw new UnauthorizedError('Incorrect username or password')
    res.cookie('userToken', user.generateAuthToken(), {
      // maxAge: 1000 * 60 * 60 * 24,
      path: '/',
      // sameSite: 'None',
      httpOnly: true, 
      // ! TODO: Enable secure for HTTPS
      // secure: true 
    })
    res.status(201).send({ data: 'set-cookie header sent'})
  } catch (err) {
    next(err)
  }
}

exports.logout = async(req, res) => {
  res.cookie('userToken', '', {
    maxAge: 0,
    path: '/',
    // sameSite: 'None',
    httpOnly: true, 
    // ! TODO: Enable secure for HTTPS
    // secure: true 
  })
  res.send({ message: "user logged out" })
}

// Register a new user
exports.add = async (req, res, next) => {
  try {
    if(req.user.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const newUser = await User.create(req.body)
    res.status(201).send({data: newUser})
  } catch (err) {
    next(err)
  }
}

exports.edit = async(req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const {id, ...otherAttributes} = req.body
    const user = await User.findByPk(req.params.id)

    otherAttributes.password !== ''
      ? await user.update(otherAttributes)
      : await user.update(otherAttributes, {fields: ['username', 'type']})
    
    if (!user) throw new ResourceNotFoundError(`We could not find a user with id: ${req.params.id}`)
    res.send({data: user})
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.type !== 'admin') throw new ForbiddenError('User is not authenticated')
    const user = await User.destroy({where: [{id: req.params.id}]})
    if (!user) throw new ResourceNotFoundError(`We could not find a user with id: ${req.params.id}`)
    res.send({data: user})
  } catch (err) {
    next(err)
  }
}