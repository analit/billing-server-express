const Login = require('./Login')
const Transaction = require('./Transaction')
const Sync = require('./Sync')
const ErrorBilling = require('./ErrorBilling')

class ResponseFactory {
    /**
     * @param {string} name
     */
    getResponse(name) {
        switch (name) {
            case "login":
                return new Login()
            case "transaction":
                return new Transaction()
            case "sync":
                return new Sync()
            default:
                throw new ErrorBilling(ErrorBilling.OTHER_ERROR, "Method not found.")
        }
    }
}

module.exports = ResponseFactory