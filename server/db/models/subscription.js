const Sequelize = require('sequelize')
const db = require('../db')

const Subscription = db.define('subscription', {
  info: {
    type: Sequelize.JSON,
    allowNull: false
  },
  intervalId: {
  	type: Sequelize.INTEGER
  }
})

module.exports = Subscription
