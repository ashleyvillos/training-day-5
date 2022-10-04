const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const Response = require('../utils/response.utils')
const { OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils')
const { 
    OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE 
} = require('../utils/message.utils')

class AuthService extends Response {
    async auth(requestObject) {
        try {
            let authentication = jwt.sign(requestObject, process.env.SECRET_KEY)
            if (authentication) {
                return this.RESPONSE(OK, { accessToken: authentication }, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.Response(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async verify(token) {
        try {
            let authentication = jwt.verify(token, process.env.SECRET_KEY)
            if (authentication) {
                return this.RESPONSE(OK, authentication, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new AuthService