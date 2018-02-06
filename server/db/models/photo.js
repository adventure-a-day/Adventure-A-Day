const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    success: {
    	type: Sequelize.BOOLEAN,
    	allowNull: false
    }
})

module.exports = Photo
