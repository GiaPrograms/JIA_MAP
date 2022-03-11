let db = require('../../database/database')

const { Sequelize } = require('sequelize');
const TreatmentClassification = require('./TreatmentClassification')
const User = require('../User')

let Treatment = db.define('treatments', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  supervision: {
    type: Sequelize.STRING,
    allowNull: false
  },
  evidence_level: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  order_number: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  specification: {
    type: Sequelize.STRING,
    allowNull: true
  },
  fr_specification: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING(512),
    allowNull: false
  },
  fr_description: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  traffic_level: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  traffic_description: {
    type: Sequelize.STRING(512),
    allowNull: false
  },
  fr_traffic_description: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  experts_suggest: {
    type: Sequelize.STRING(512),
    allowNull: false
  },
  fr_experts_suggest: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  how_use: {
    type: Sequelize.STRING(1024)
  },
  fr_how_use: {
    type: Sequelize.STRING(1024),
    allowNull: true
  },
  how_soon: {
    type: Sequelize.STRING(512),
  },
  fr_how_soon: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  cost: {
    type: Sequelize.STRING(512)
  },
  fr_cost: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  where: {
    type: Sequelize.STRING(512)
  },
  fr_where: {
    type: Sequelize.STRING(512),
    allowNull: true
  },
  consider: {
    type: Sequelize.STRING(1024)
  },
  fr_consider: {
    type: Sequelize.STRING(1024),
    allowNull: true
  },
  image: {
    type: Sequelize.STRING(1024)
  },
  treatment_classification_id: {
    type: Sequelize.STRING,
    references: {
      model: TreatmentClassification,
      key: 'id',
    }
  }
}, {
  underscored: true
})

Treatment.belongsTo(TreatmentClassification)
TreatmentClassification.hasMany(Treatment)

Treatment.belongsToMany(User, {through: 'user_treatment'})
User.belongsToMany(Treatment, {through: 'user_treatment'})

Treatment.belongsToMany(User, {through: 'user_favourite'})
User.belongsToMany(Treatment, {through: 'user_favourite', as: 'favourite',})

Treatment.belongsToMany(User, {through: 'user_plan', as: 'plan'})
User.belongsToMany(Treatment, {through: 'user_plan', as: 'plan'})

Treatment.belongsToMany(User, {through: 'user_sc'})
User.belongsToMany(Treatment, {through: 'user_sc', as: 'sc'})

Treatment.belongsToMany(User, {through: 'user_hcp'})
User.belongsToMany(Treatment, {through: 'user_hcp', as: 'hcp'})

module.exports = Treatment