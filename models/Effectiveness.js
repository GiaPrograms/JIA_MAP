let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Effectiveness = db.define('effectiveness', {
  control_arthritis: {
    type: Sequelize.FLOAT
  },
  manage_pain: {
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

User.hasOne(Effectiveness);
Effectiveness.belongsTo(User);

module.exports = Effectiveness