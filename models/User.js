const Sequelize = require('sequelize')
const config = require('../config/config')

const User = config.define('User', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    middle_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
})

module.exports = User