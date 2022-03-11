let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let TreatmentText = db.define('treatment_text', {
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

User.hasOne(TreatmentText);
TreatmentText.belongsTo(User);

module.exports = TreatmentText