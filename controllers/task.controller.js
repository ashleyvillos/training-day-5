const TaskService = require('../services/task.service')

class TaskController {
    async getAllTask(requestObject) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let response = await TaskService.getAllTask(offset, limit, sort, order)
        return response
    }

    async getOneTask(taskId) {
        let response = await TaskService.getOneTask(taskId)
        return response
    }

    async createTask(requestObject) {
        let response = await TaskService.createTask(requestObject)
        return response
    }

    async updateTask(requestObject) {
        let response = await TaskService.updateTask(requestObject)
        return response
    }

    async deleteTask(taskId) {
        let response = await TaskService.deleteTask(taskId)
        return response
    }
}

module.exports = new TaskController