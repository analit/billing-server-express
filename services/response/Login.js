const User = require("../../models/user");

class Login {
    /**
     * @param {Object} requestBody 
     * @param {string} requestBody.token
     */
    async createBody(requestBody) {
        const user = await User.findOne({ token: requestBody.token });
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