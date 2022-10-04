const UserService = require('../services/user.service')

class UserController {
    async getAllUsers(requestObject) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let response = await UserService.getAllUsers(offset, limit, sort, order)
        return response
    }
 
    async getOneUser(userId) {
        let response = await UserService.getOneUser(userId)
        return response
    }

    async getUserTasks(userId) {
        let response = await UserService.getUserTasks(userId)
        return response
    }

    async getUserInfo(userId) {
        let response = await UserService.getUserInfo(userId)
        return response
    }
 
    async createUser(requestObject) {
        let response = await UserService.createUser(requestObject)
        return response
    }
 
    async updateUser(requestObject) {
        let response = await UserService.updateUser(requestObject)
        return response
    }
 
    async deleteUser(userId) {
        let response = await UserService.deleteUser(userId)
        return response
    }
}

module.exports = new UserController