const express = require('express')
const UserRouter = express.Router()
const UserController = require('../controllers/user.controller')

UserRouter.get('/user', async (req, res) => {
    let response = await UserController.getAllUsers(req.query)
    return res.status(200).send({response})
})

UserRouter.get('/user/:id', async (req, res) => {
    let response = await UserController.getOneUser(parseInt(req.params.id))
    return res.status(200).send({response})
})

UserRouter.get('/user/tasks/:id', async (req, res) => {
    let response = await UserController.getUserTasks(parseInt(req.params.id))
    return res.status(200).send({response})
})

UserRouter.get('/user/info/:id', async (req, res) => {
    let response = await UserController.getUserInfo(parseInt(req.params.id))
    return res.status(200).send({response})
})


UserRouter.put('/user', async (req, res) => {
    let response = await UserController.updateUser(req.body)
    return res.status(200).send({response})
})

UserRouter.delete('/user/:id', async (req, res) => {
    let response = await UserController.deleteUser(req.params.id)
    return res.status(200).send({response})
})

module.exports = UserRouter