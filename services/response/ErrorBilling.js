class ErrorBilling {

    static TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND'
    static OTHER_ERROR = "OTHER_ERROR"
    static LOW_BALANCE = "LOW_BALANCE"
    
    /**
     * @param {string} code
     * @param {string} message 
     */
    constructor(code, message) {
        this.code = code
        this.message = message
    }
}

module.exports = ErrorBilling