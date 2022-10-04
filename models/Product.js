const Sequelize = require('sequelize')
const config = require('../config/config')

const Product = config.define('Product', {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
})

module.exports = Product