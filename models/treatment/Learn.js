let db = require('../../database/database')

const { Sequelize } = require('sequelize');
const Treatment = require('./Treatment')

let Learn = db.define('learn', {
  link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fr_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_app: {
    type: Sequelize.BOOLEAN
  },
  treatment_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Treatment,
      key: 'id',
    }
  },
}, {
  underscored: true
})

Treatment.hasMany(Learn);
Learn.belongsTo(Treatment);

module.exports = Learn