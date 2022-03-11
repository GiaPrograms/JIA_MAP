let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Motivation = db.define('motivation', {
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

User.hasOne(Motivation);
Motivation.belongsTo(User);

module.exports = Motivation