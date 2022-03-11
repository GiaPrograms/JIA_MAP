let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let PlanFactorsText = db.define('plan_factors_texts', {
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

User.hasOne(PlanFactorsText);
PlanFactorsText.belongsTo(User);

module.exports = PlanFactorsText