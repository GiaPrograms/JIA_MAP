let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let PainArea = db.define('pain_areas', {
  ankles: {
    type: Sequelize.BOOLEAN
  },
  elbows: {
    type: Sequelize.BOOLEAN
  },
  hips: {
    type: Sequelize.BOOLEAN
  },
  jaw: {
    type: Sequelize.BOOLEAN
  },
  knees: {
    type: Sequelize.BOOLEAN
  },
  lower_back: {
    type: Sequelize.BOOLEAN
  },
  shoulders: {
    type: Sequelize.BOOLEAN
  },
  neck:{
    type: Sequelize.BOOLEAN
  },
  wrists: {
    type: Sequelize.BOOLEAN
  },
  fingers: {
    type: Sequelize.BOOLEAN
  },
  toes:{
    type: Sequelize.BOOLEAN
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

User.hasOne(PainArea);
PainArea.belongsTo(User);

module.exports = PainArea