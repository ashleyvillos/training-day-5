const express = require('express')
const UserRouter = express.Router()
const UserController = require('../controllers/user.controller')

UserRouter.post('/login', async (req, res) => {
    let response = await UserController.login(req.body)
    return res.status(200).send({response})
})

UserRouter.post('/signup', async (req, res) => {
    let response = await UserController.signup(req.body)
    return res.status(200).send({response})
})

module.exports = UserRouter