const Sequelize = require('sequelize')
const db = require('../db')

const Clue = db.define('clue', {
  prompt: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  hint1: {
    type: Sequelize.TEXT
  },
  hint2: {
    type: Sequelize.TEXT
  },
  gps: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  region: {
    type: Sequelize.STRING
  }
})

module.exports = Clue
