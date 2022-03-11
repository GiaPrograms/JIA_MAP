let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Suggestion = db.define('suggestions', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fr_title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING
  },
  fr_description: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  underscored: true
})

Suggestion.belongsToMany(User, {through: 'user_suggestion'})
User.belongsToMany(Suggestion, {through: 'user_suggestion'})
//Suggestion.sync()

module.exports = Suggestion