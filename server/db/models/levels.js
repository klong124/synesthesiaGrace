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

