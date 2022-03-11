let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Log = db.define('logs', {
  purpose: {
    type: Sequelize.STRING
  },
  plan: {
    type: Sequelize.JSON
  },
  step_one: {
    type: Sequelize.JSON
  },
  preferences: {
    type: Sequelize.JSON
  },
  step_three: {
    type: Sequelize.JSON
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  }
}, {
  underscored: true
})

User.hasOne(Log);
Log.belongsTo(User);

module.exports = Log