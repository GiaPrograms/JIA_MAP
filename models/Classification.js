let db = require('../database/database')

const { Sequelize } = require('sequelize');

let Classification = db.define('classifications', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  section: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_section: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  underscored: true
})

module.exports = Classification