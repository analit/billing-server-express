class Response {
    /**
     * 
     * @param {string} id 
     */
    constructor(id) {
        this.id = id
    }

    createBody() {
        return {
            id: this.id
        }
    }
}

module.exports = Response