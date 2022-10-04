const User = require('../models/User')
const Task = require('../models/Task')
const Info = require('../models/Info')
const Response = require('../utils/response.utils')
const { OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils')
const { 
    OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE,
    BADREQUEST_USER_EXIST_MESSAGE
} = require('../utils/message.utils')

class UserService extends Response {
    async getAllUsers(offset, limit, sort, order) {
        try {
            let users = await User.findAll({
                offset: offset,
                limit: limit,
                order: [[sort, order]],
                where: { is_active: true }
            })
            if (users) {
                return this.RESPONSE(OK, users, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getOneUser(userId) {
        try {
            let user = await User.findOne({ where: { id: userId, is_active: true } })
            if (user) {
                return this.RESPONSE(OK, user, OK_MESSAGE)    
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)    
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getUserTasks(userId) {
        try {
            let user = await User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'is_active']
                },
                include: {
                    model: Task,
                    as: 'task_items',
                    attributes: ['id', 'task', 'schedule_datetime']
                }
            })
            if (user) {
                return this.RESPONSE(OK, user, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getUserInfo(userId) {
        try {
            let user = await User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'is_active']
                },
                include: {
                    model: Info,
                    as: 'user_info',
                    attributes: {
                        exclude: ['is_active', 'createdAt', 'updatedAt', 'user_id']
                    }
                }
            })
            if (user) {
                return this.RESPONSE(OK, user, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async createUser(requestObject) {
        try {
            let user = await User.findOne({
                where: {
                    first_name: requestObject.first_name,
                    middle_name: requestObject.middle_name,
                    last_name: requestObject.last_name
                }
            })
            if (!user) {
                let createData = await User.create(requestObject)
                if (createData) {
                    return this.RESPONSE(CREATED, createData, CREATED_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(BADREQUEST, user, BADREQUEST_USER_EXIST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateUser(requestObject) {
        try {
            let user = await User.findOne({ where: { id: requestObject.id } })
            if (user) {
                let updateData = await User.update(requestObject, { where: { id: requestObject.id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteUser(userId) {
        try {
            let user = await User.findOne({ where: { id: userId } })
            if (user) {
                let updateData = await User.update({ is_active: false }, { where: { id: userId } })
                if (updateData) {
                    return this.RESPONSE(OK, updateData, 'Successfully Deleted')
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new UserService