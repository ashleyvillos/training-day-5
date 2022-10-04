const Store = require('../models/Store')
const User = require('../models/User')
const Product = require('../models/Product')

// ******************* STORE ******************* //
Store.hasMany(Product, {
    foreignKey: 'store_id',
    as: 'product_items'
})

// ******************* PRODUCT ******************* //
Product.belongsTo(Store, {
    foreignKey: 'store_id',
    as: 'store_info'
})

module.exports = { Store, User, Product }