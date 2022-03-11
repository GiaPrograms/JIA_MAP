let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Confidence = db.define('confidence', {
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

User.hasOne(Confidence);
Confidence.belongsTo(User);

module.exports = Confidence