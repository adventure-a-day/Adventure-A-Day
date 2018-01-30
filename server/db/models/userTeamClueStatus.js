const Sequelize = require("sequelize")
const db = require("../db")

const UserTeamClueStatus = db.define("user-team-clue-status", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "unassigned"
  }
})

module.exports = UserTeamClueStatus
