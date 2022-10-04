const InfoService = require('../services/info.service')

class InfoController {
    async updateInfo(requestObject) {
        let response = await InfoService.updateInfo(requestObject)
        return response
    }
}

module.exports = new InfoController