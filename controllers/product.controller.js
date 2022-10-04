const ProductService = require('../services/product.service')

class ProductController {
    async getAllProductsByStoreId() {
        let response = await ProductService.getAllProductsByStoreId()
        return response
    }

    async getProductIdWithStoreInfo(productId) {
        let response = await ProductService.getProductIdWithStoreInfo(productId)
        return response
    }

    async getAllProducts(requestObject) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let response = await ProductService.getAllProducts(offset, limit, sort, order)
        return response
    }


    // async getAllStore() {
    //     let response = await StoreService.getAllStore()
    //     return response
    // }

    // async getOneStore(storeId) {
    //     let response = await StoreService.getOneStore(storeId)
    //     return response
    // }

    // async createStore(requestObject) {
    //     let response = await StoreService.createStore(requestObject)
    //     return response
    // }

    // async updateStore(storeId, requestObject) {
    //     let response = await StoreService.updateStore(storeId, requestObject)
    //     return response
    // }

    // async deleteStore(storeId) {
    //     let response = await StoreService.deleteStore(storeId)
    //     return response
    // }
}

module.exports = new ProductController