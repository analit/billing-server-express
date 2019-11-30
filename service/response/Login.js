const Response = require('./Response')
const ErrorBilling = require('./ErrorBilling');

class Login extends Response {

    createBody() {
        // throw new ErrorBilling(ErrorBilling.TOKEN_NOT_FOUND, "")
        const body = {
            user: {
                id: 123456789,
                currency: "EUR"
            },
            balance: {
                value: 1000,
                version: 0
            }
        }
        return {...super.createBody(), ...body }
    }
}

module.exports = Login;