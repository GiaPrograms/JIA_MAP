let db = require('../database/database')

const { Sequelize } = require('sequelize');
const Treatment = require('./treatment/Treatment')
const Preference = require('./Preference')

let Category = db.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
})

// Treatment.hasMany(Category);
// Category.belongsTo(Treatment);

Category.belongsToMany(Treatment, {through: 'treatment_category'})
Treatment.belongsToMany(Category, {through: 'treatment_category'})

Category.belongsToMany(Preference, {through: 'preference_category'})
Preference.belongsToMany(Category, {through: 'preference_category'})

module.exports = Category