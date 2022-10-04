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

class InfoService extends Response {
    // update user info if existing, create if not
    async updateInfo(requestObject) {
        try {
            let user = await Info.findOne({ where: { user_id: requestObject.user_id } })
            if (user) {
                let updateData = await Info.update(requestObject, { where: { user_id: requestObject.user_id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            } else {
                let createData = await Info.create(requestObject)
                if (createData) {
                    return this.RESPONSE(CREATED, createData, CREATED_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE)
                }
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

module.exports = new InfoService