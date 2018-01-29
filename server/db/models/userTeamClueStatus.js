const Sequelize = require('sequelize')
const db = require('../db')

const UserTeamClueStatus = db.define('user-team-clue-status', {
  status: {
    type: Sequelize.STRING
  }
})

module.exports = UserTeamClueStatus
