const Task = require('../models/Task')
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

class TaskService extends Response {
    async getAllTask(offset, limit, sort, order) {
        try {
            let task = await Task.findAll({
                offset: offset,
                limit: limit,
                order: [[sort, order]]
            })
            if (task) {
                return this.RESPONSE(OK, task, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getOneTask(taskId) {
        try {
            let task = await Task.findOne({ where: { id: taskId } })
            if (task) {
                return this.RESPONSE(OK, task, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE)    
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    // No duplicate validations included
    // This function allows multiple tasks with the same task name --> No Restrictions
    async createTask(requestObject) {
        try {
            let createData = await Task.create(requestObject)
            if (createData) {
                return this.RESPONSE(CREATED, createData, CREATED_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateTask(requestObject) {
        try {
            let task = await Task.findOne({ where: { id: requestObject.id } })
            if (task) {
                let updateData = await Task.update(requestObject, { where: { id: requestObject.id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, [], UPDATE_MESSAGE)    
                } else {
                    return this.RESPONSE(BADREQUEST, [], BADREQUEST_MESSAGE)    
                }
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteTask(taskId) {
        try {
            let task = await Task.findOne({ where: { id: taskId } })
            if (task) {
                let removeData = await Task.destroy({ where: { id: taskId } })
                if (removeData) {
                    return this.RESPONSE(OK, {}, "Successfully Deleted")
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new TaskService