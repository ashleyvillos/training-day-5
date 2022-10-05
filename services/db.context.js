const User = require('../models/User')
const Task = require('../models/Task')
const Info = require('../models/Info')

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

module.exports = { User, Task, Info }