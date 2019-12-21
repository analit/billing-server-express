const User = require("../models/user")
const ErrorApi = require('../services/response/ErrorApi')

module.exports = function(req, res, next) {
    User.findOne({ token: req.body.token }).then(user => {
        if (/create-user/.test(req.path)) {
            if (user) {
                return next(new ErrorApi("user already exists"))
            } else {
                return next();
            }
        }
        if (!user) {
            return next(new ErrorApi("user not found"))
        }
        req.user = user;
        next();
    }).catch(error => {
        next(error)
    })
}