const express = require('express')
const StoreRouter = express.Router()
const StoreController = require('../controllers/store.controller')
const AuthService = require('../services/auth.service')

StoreRouter.get('/store', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await StoreController.getAllStore()
        return res.status(200).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

StoreRouter.get('/store/:id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await StoreController.getOneStore(parseInt(req.params.id))
        return res.status(200).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

StoreRouter.post('/store', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await StoreController.createStore(req.body)
        return res.status(200).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

StoreRouter.put('/store/:id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await StoreController.updateStore(parseInt(req.params.id), req.body)
        return res.status(200).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

StoreRouter.delete('/store/:id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await StoreController.deleteStore(parseInt(req.params.id))
        return res.status(200).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

module.exports = StoreRouter