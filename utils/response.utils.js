class Response {
    async RESPONSE(status=200, response={}, message="Success") {
        return { status, response, message }
    }
}

module.exports = Response