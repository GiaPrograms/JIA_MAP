let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Factor = db.define('factors', {
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
    allowNull: true,
  },
}, {
  underscored: true
})

Factor.belongsToMany(User, {through: 'user_factor'})
User.belongsToMany(Factor, {through: 'user_factor'})
//Factor.sync()

module.exports = Factor