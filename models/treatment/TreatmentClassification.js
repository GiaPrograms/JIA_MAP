let db = require('../../database/database')

const { Sequelize } = require('sequelize');

let TreatmentClassification = db.define('treatment_classifications', {
  
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_name: {
    type: Sequelize.STRING,
    allowNull: true
  }

}, {
  underscored: true
})

module.exports = TreatmentClassification