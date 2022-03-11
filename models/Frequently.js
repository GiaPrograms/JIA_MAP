let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Frequently = db.define('frequently', {
  prescribed_meds: {
    type: Sequelize.STRING
  },
  fr_prescribed_meds: {
    type: Sequelize.STRING
  },
  other_treatments: {
    type: Sequelize.STRING
  },
  fr_other_treatments: {
    type: Sequelize.STRING
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

User.hasOne(Frequently);
Frequently.belongsTo(User);

//Frequently.sync()

module.exports = Frequently