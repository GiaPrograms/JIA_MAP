let db = require('../../database/database')

const { Sequelize } = require('sequelize');
const Treatment = require('./Treatment')

let Video = db.define('videos', {
  link: {
    type: Sequelize.STRING(1024),
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

Treatment.hasMany(Video);
Video.belongsTo(Treatment);

module.exports = Video