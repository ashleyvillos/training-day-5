const express = require('express')
const ProductRouter = express.Router()
const ProductController = require('../controllers/product.controller')
const AuthService = require('../services/auth.service')

// get products by store
ProductRouter.get('/products-by-store-id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await ProductController.getAllProductsByStoreId()
        return res.status(response.status).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

// get store information per product
ProductRouter.get('/store-by-product/:id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    if (authenticate.status == 200) {
        let response = await ProductController.getProductIdWithStoreInfo(parseInt(req.params.id))
        return res.status(response.status).send({response})
    } else {
        return res.status(authenticate.status).send(authenticate)
    }
})

// get store information per product
ProductRouter.get('/get-all-products', async (req, res) => {
    let response = await ProductController.getAllProducts(req.query)
    return res.status(response.status).send({response})

    // let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
    // if (authenticate.status == 200) {
    //     let response = await ProductController.getProductIdWithStoreInfo(parseInt(req.params.id))
    //     return res.status(response.status).send({response})
    // } else {
    //     return res.status(authenticate.status).send(authenticate)
    // }
})

// ProductRouter.get('/store/:id', async (req, res) => {
//     let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
//     if (authenticate.status == 200) {
//         let response = await StoreController.getOneStore(parseInt(req.params.id))
//         return res.status(200).send({response})
//     } else {
//         return res.status(authenticate.status).send(authenticate)
//     }
// })

// ProductRouter.post('/store', async (req, res) => {
//     let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
//     if (authenticate.status == 200) {
//         let response = await StoreController.createStore(req.body)
//         return res.status(200).send({response})
//     } else {
//         return res.status(authenticate.status).send(authenticate)
//     }
// })

// ProductRouter.put('/store/:id', async (req, res) => {
//     let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
//     if (authenticate.status == 200) {
//         let response = await StoreController.updateStore(parseInt(req.params.id), req.body)
//         return res.status(200).send({response})
//     } else {
//         return res.status(authenticate.status).send(authenticate)
//     }
// })

// ProductRouter.delete('/store/:id', async (req, res) => {
//     let authenticate = await AuthService.verify(req.headers['authorization'].split(' ')[1])
//     if (authenticate.status == 200) {
//         let response = await StoreController.deleteStore(parseInt(req.params.id))
//         return res.status(200).send({response})
//     } else {
//         return res.status(authenticate.status).send(authenticate)
//     }
// })

module.exports = ProductRouter