let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let PrescribedText = db.define('prescribed_text', {
  text: {
    type: Sequelize.TEXT
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

User.hasOne(PrescribedText);
PrescribedText.belongsTo(User);

module.exports = PrescribedText