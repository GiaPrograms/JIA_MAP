let db = require('../database/database')

const { Sequelize } = require('sequelize');

let Preference = db.define('preferences', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fr_description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  recommends: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  left_label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_left_label: {
    type: Sequelize.STRING,
    allowNull: true
  },
  right_label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_right_label: {
    type: Sequelize.STRING,
    allowNull: true
  },
  reversed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  threshold: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
}, {
  underscored: true
})

module.exports = Preference