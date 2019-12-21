module.exports = class Sync {
    createBody( req ) {
        return {
            balance: {
                value: req.user.balance,
                version: req.user.version
            }
        }
    }
}