const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
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
const AuthService = require('../services/auth.service')

class UserService extends Response {
    async login(requestObject) {
        try {
            let user = await User.findOne({ where: { username: requestObject.username } })
            if (user) {
                let passwordConfirm = await bcrypt.compare(requestObject.password, user['dataValues'].password)
                if (passwordConfirm) {
                    let token = await AuthService.auth(user['dataValues'])
                    // let token = await AuthService.auth(requestObject)
                    return this.RESPONSE(OK, token.response, OK_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.Response(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async signup(requestObject) {
        try {
            if (requestObject) {
                let exist = await User.findOne({ where: { username: requestObject.username } })
                if (exist) {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_USER_EXIST_MESSAGE)
                }
                if (requestObject.password == requestObject.confirmPassword) {
                    let hashPassword = await bcrypt.hash(requestObject.password, 10)
                    let response = await User.create({
                        username: requestObject.username,
                        password: hashPassword,
                        is_active: true
                    })
                    if (response) {
                        return this.RESPONSE(OK, response, OK_MESSAGE)
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                    }
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
            }
            
        } catch(err) {
            return this.Response(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new UserService