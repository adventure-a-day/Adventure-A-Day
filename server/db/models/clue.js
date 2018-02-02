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
    type: Sequelize.ARRAY(Sequelize.DOUBLE)
  },
  region: {
    type: Sequelize.STRING
  },
  answer: {
    type: Sequelize.STRING
  },
  labels: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  webLabels: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Clue
