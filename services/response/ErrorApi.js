class ErrorApi extends Error {
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        this.message = message;
        super(message);
    }
}