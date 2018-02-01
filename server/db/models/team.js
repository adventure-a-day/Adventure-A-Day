const Sequelize = require("sequelize")
const db = require("../db")

const Team = db.define("team", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  activeMission: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Team
