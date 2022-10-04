const Response = require('../utils/response.utils')
const Product = require('../models/Product')
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

class ProductService extends Response {
    async getAllProductsByStoreId() {
        try {
            let exist = await Store.findAll({ 
                include: { 
                    model: Product, 
                    as: 'product_items',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            if (exist) {
                return this.RESPONSE(OK, exist, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getProductIdWithStoreInfo(productId) {
        try {
            let exist = await Product.findOne({ 
                where: {id: productId},
                include: { model: Store, as: 'store_info' }
            })
            if (exist) {
                return this.RESPONSE(OK, exist, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getAllProducts(offset, limit, sort, order) {
        try {
            let exist = await Product.findAll({ 
                offset: offset,
                limit: limit,
                order: [[sort, order]]
            })
            if (exist) {
                return this.RESPONSE(OK, exist, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new ProductService