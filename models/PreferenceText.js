let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let PreferenceText = db.define('preference_text', {
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

User.hasOne(PreferenceText);
PreferenceText.belongsTo(User);

module.exports = PreferenceText