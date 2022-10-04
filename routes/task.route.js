const express = require('express')
const TaskRouter = express.Router()
const TaskController = require('../controllers/task.controller')

TaskRouter.get('/task', async (req, res) => {
    let response = await TaskController.getAllTask(req.query)
    return res.status(200).send({response})
})

TaskRouter.get('/task/:id', async (req, res) => {
    let response = await TaskController.getOneTask(parseInt(req.params.id))
    return res.status(200).send({response})
})

TaskRouter.post('/task', async (req, res) => {
    let response = await TaskController.createTask(req.body)
    return res.status(200).send({response})
})

TaskRouter.put('/task', async (req, res) => {
    let response = await TaskController.updateTask(req.body)
    return res.status(200).send({response})
})

TaskRouter.delete('/task/:id', async (req, res) => {
    let response = await TaskController.deleteTask(req.params.id)
    return res.status(200).send({response})
})

module.exports = TaskRouter