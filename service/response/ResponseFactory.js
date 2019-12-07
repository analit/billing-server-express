const Login = require( './Login' )
const Transaction = require( './Transaction' )
const Sync = require( './Sync' )

class ResponseFactory {
    /**
     * @param {string} name
     * @param {string} id
     */
    getResponse( name, id ) {
        switch (name) {
            case "login":
                return new Login()
            case "transaction":
                return new Transaction()
            case "sync":
                return new Sync()
            default:
                throw new Error( "Method not found." )
        }
    }
}

module.exports = ResponseFactory