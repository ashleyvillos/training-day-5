const Store = require('../models/Store')
const User = require('../models/User')
const Task = require('../models/Task')
const Info = require('../models/Info')
const Product = require('../models/Product')

// ******************* USER ******************* //
User.hasOne(Info, {
    foreignKey: 'user_id',
    as: 'user_info'
})

User.hasMany(Task, {
    foreignKey: 'user_id',
    as: 'task_items'
})

// ******************* INFO ******************* //
Info.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

// ******************* TASK ******************* //
Task.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

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

module.exports = { Store, User, Product, Task, Info }