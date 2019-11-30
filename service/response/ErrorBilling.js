class ErrorBilling {

    static TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND"
    static OTHER_ERROR = "OTHER_ERROR"
        /**
         * 
         * @param {string} type 
         * @param {string} message 
         */
    constructor(type, message) {
        this.type = type
        this.message = message
    }

}

module.exports = ErrorBilling