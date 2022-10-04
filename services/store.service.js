const Response = require('../utils/response.utils')
const Store = require('../models/Store')
const { OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils')
const { 
    OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE 
} = require('../utils/message.utils')

class StoreService extends Response {
    async getAllStore() {
        try {
            let exist = await Store.findAll()
            
            if (exist) {
                return this.RESPONSE(OK, exist, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getOneStore(storeId) {
        try {
            let exist = await Store.findOne({ where: { id: storeId } })
            
            if (exist) {
                return this.RESPONSE(OK, exist, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async createStore(requestObject) {
        try {
            // check if data exists
            let exist = await Store.findOne({ where: { name: requestObject.name } })

            if (!exist) {
                let createData = await Store.create(requestObject)
                if (createData) {
                    return this.RESPONSE(OK, createData, OK_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, createData, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(OK, exist, "Data Exists")
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }   
    }

    async updateStore(storeId, requestObject) {
        try {
            let exist = await Store.findOne({ where: { id: storeId } })
            if (exist) {
                // format: update(updateData, condition) 
                let updateData = await Store.update(requestObject, { where: { id: storeId } })

                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteStore(storeId) {
        try {
            let exist = await Store.findOne({ where: { id: storeId } })
            if (exist) {
                let removeData = await Store.destroy({ where: { id: storeId } })
                if (removeData) {
                    return this.RESPONSE(OK, {}, "Successfully Deleted")
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new StoreService