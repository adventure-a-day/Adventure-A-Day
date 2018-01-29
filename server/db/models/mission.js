const Sequelize = require('sequelize')
const db = require('../db')

const Mission = db.define('mission', {
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Mission
