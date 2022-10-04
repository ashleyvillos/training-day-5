const StoreService = require('../services/store.service')

class StoreController {
    async getAllStore() {
        let response = await StoreService.getAllStore()
        return response
    }

    async getOneStore(storeId) {
        let response = await StoreService.getOneStore(storeId)
        return response
    }

    async createStore(requestObject) {
        let response = await StoreService.createStore(requestObject)
        return response
    }

    async updateStore(storeId, requestObject) {
        let response = await StoreService.updateStore(storeId, requestObject)
        return response
    }

    async deleteStore(storeId) {
        let response = await StoreService.deleteStore(storeId)
        return response
    }
}

module.exports = new StoreController