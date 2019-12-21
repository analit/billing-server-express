const ErrorBilling = require('./ErrorBilling')
module.exports = class Transaction {
    /**
     *
     * @param {Request} req
     */
    async createBody( req ) {
        const user = req.user
        if (user.balance < req.body.minus){
            throw new ErrorBilling(ErrorBilling.LOW_BALANCE, "low balance")
        }

        user.balance += req.body.plus
        user.balance -= req.body.minus
        user.version += 1

        const savedUser = await user.save();

        return {
            balance: {
                value: savedUser.balance,
                version: savedUser.version
            }
        }
    }
}