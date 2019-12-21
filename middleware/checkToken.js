const User = require("../models/user")
const ErrorBilling = require("../services/response/ErrorBilling")

module.exports = function(req, res, next) {
    User.findOne({ token: req.body.token }).then(
        user => {
            if (!user)
                next(new ErrorBilling(ErrorBilling.TOKEN_NOT_FOUND, "token not found!"))
            else {
                req.user = user
                next()
            }
        }
    ).catch(error => next(error))
}