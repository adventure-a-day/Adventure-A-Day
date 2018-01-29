const Sequelize = require('sequelize')
const db = require('../db')

const Clue = db.define('clue', {
  prompt: {
    type: Sequelize.
    allowNull: false
  }
})

module.exports = Clue
