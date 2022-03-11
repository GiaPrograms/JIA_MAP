let db = require('../database/database')

const { Sequelize } = require('sequelize');
const User = require('./User')

let Review = db.define('reviews', {
  selection: {
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

User.hasOne(Review);
Review.belongsTo(User);

//db.sync()

module.exports = Review