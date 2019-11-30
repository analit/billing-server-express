const Login = require('./Login')

class ResponseFactory {
    /**
     * @param {string} name 
     * @param {string} id 
     */
    getResponse(name, id) {
        switch (name) {
            case "login":
                return new Login(id);
            default:
                throw new Error("Method not found.")
        }
    }
}

module.exports = ResponseFactory