module.exports = class Sync {
    createBody( requestBody ) {
        return {
            balance: {
                value: 0,
                version: 0
            }
        }
    }
}