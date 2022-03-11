let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')
const Classification = require('./Classification')

let Medication = db.define('medications', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  classification_id: {
    type: Sequelize.STRING,
    references: {
      model: Classification,
      key: 'id',
    }
  }
}, {
  underscored: true
})


Medication.belongsTo(Classification)
Classification.hasMany(Medication)

Medication.belongsToMany(User, {through: 'user_medication'})
User.belongsToMany(Medication, {through: 'user_medication'})

module.exports = Medication