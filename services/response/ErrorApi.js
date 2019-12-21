class ErrorApi extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.message = message;
    }
}

module.exports = ErrorApi