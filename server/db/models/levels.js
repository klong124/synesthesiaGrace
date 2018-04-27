const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Levels = db.define('levels', {
  notes: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Levels

// /**
//  * instanceMethods
//  */
// Levels.prototype.correctPassword = function (candidatePwd) {
//   return Levels.encryptPassword(candidatePwd, this.salt()) === this.password()
// }
//
// /**
//  * classMethods
//  */
// Levels.generateSalt = function () {
//   return crypto.randomBytes(16).toString('base64')
// }
//
// Levels.encryptPassword = function (plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }
//
// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = Levels.generateSalt()
//     user.password = Levels.encryptPassword(user.password(), user.salt())
//   }
// }
//
// Levels.beforeCreate(setSaltAndPassword)
// Levels.beforeUpdate(setSaltAndPassword)
