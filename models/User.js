const db = require('../database/database')
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds =  14

let User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
})

// Generate authentication token, set id and type to payload
User.prototype.generateAuthToken = function() {
  // ! Remove hardcoded secret key in production
  return jwt.sign({ id: this.id, type: this.type}, 'superSecureSecret') //, {expiresIn: '5h'}
}

User.authenticate = async function(username, password){
  // Find a user with a matching username
  // If not matching user if found, returns null
  const user = await this.findOne({
    where: {
      username: username
    }
  })
  const hashedPassword = user
    ? user.password
    : `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
  const passwordDidMatch = await bcrypt.compare(password, hashedPassword)

  //console.log(password + ", " + hashedPassword);
  //console.log(passwordDidMatch);

  return passwordDidMatch ? user : null
}

User.beforeCreate(async user => {
  user.password = await bcrypt.hash(user.password, saltRounds)
});

User.beforeUpdate(async user => {
  if (user.changed('password')) 
  user.password = await bcrypt.hash(user.password, saltRounds)
});



// Do not return user password
User.prototype.toJSON = function () {
  const obj = Object.assign({}, this.get());
  delete obj.password
  return obj
}

module.exports = User
