const User = require("../../models/user");

class Login {
    /**
     * @param {Request} req
     */
    createBody(req) {
        const user = req.user
        return {
            user: {
                id: user._id.toString(),
                currency: user.currency
            },
            balance: {
                value: user.balance,
                version: user.version
            }
        }
    }

}

module.exports = Login;