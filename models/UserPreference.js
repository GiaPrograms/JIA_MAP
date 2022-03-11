let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')
const Preference = require('./Preference')

let UserPreference = db.define('user_preference', {
  value: {
    type: Sequelize.FLOAT
  }
}, {
  underscored: true
})

Preference.belongsToMany(User, {through: 'user_preference'})
User.belongsToMany(Preference, {through: 'user_preference', as: 'pref'})

module.exports = UserPreference