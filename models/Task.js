const Sequelize = require('sequelize')
const config = require('../config/config')

const Task = config.define('Task', {
    task: {
        type: Sequelize.STRING,
        allowNull: true
    },
    schedule_datetime: {
        type: Sequelize.DATE,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
})

module.exports = Task