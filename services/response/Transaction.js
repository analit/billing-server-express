module.exports = class Transaction {
    createBody( requestBody ) {
        return {
            balance: {
                value: 0,
                version: 0
            }
        }
    }
}