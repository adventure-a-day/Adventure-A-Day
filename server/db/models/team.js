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
  },
  streak: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Team
