const Sequelize = require('sequelize');

// ! update DB

// Code to connect to local database 
// const db = new Sequelize('JIA', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// Code to connect to global database 
const db = new Sequelize('jia-optionmap-database', 'admin', 'admin', {
  host: 'us-mm-dca-ec51fe76a795.g5.cleardb.net',
  dialect: 'mysql',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => console.log("Connected to the Database"))
  .catch(err => console.log("Error...",err))

module.exports = db