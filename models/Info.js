const Sequelize = require('sequelize')
const config = require('../config/config')

const Info = config.define('Info', {
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hobbies: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    birthplace: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
})

module.exports = Info