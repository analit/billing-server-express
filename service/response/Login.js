const ErrorBilling = require( './ErrorBilling' );

class Login {

    createBody( requestBody ) {
        // throw new ErrorBilling(ErrorBilling.TOKEN_NOT_FOUND, "")
        return {
            user: {
                id: 123456789,
                currency: "EUR"
            },
            balance: {
                value: 1000,
                version: 0
            }
        }
    }
}

module.exports = Login;