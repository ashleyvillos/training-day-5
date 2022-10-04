const express = require('express')
const InfoRouter = express.Router()
const InfoController = require('../controllers/info.controller')

InfoRouter.post('/info', async (req, res) => {
    console.log('pasok here')
    let response = await InfoController.updateInfo(req.body)
    return res.status(200).send({response})
})

module.exports = InfoRouter