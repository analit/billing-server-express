const Login = require('./Login')
const Transaction = require('./Transaction')
const Sync = require('./Sync')
const ErrorBilling = require('./ErrorBilling')
const Logout = require('./Logout');

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
            case "logout":
                return new Logout()
            default:
                throw new ErrorBilling(ErrorBilling.OTHER_ERROR, "Method not found.")
        }
    }
}

module.exports = ResponseFactory