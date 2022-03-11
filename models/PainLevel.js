let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let PainLevel = db.define('pain_levels', {
  level: {
    type: Sequelize.FLOAT
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
}, {
  underscored: true
})

User.hasOne(PainLevel);
PainLevel.belongsTo(User);

module.exports = PainLevel