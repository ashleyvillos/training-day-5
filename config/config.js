const dotenv = require('dotenv').config()
const { Sequelize } = require('sequelize')

const db = {
    database: process.env.database,
    username: process.env.uname,
    password: process.env.password,
    host: process.env.host,
    port: process.env.db_port,
    dialect: process.env.dialect,
    logging: false
}

module.exports = new Sequelize(db)