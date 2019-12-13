const User = require("../models/user")

module.exports = function (req, res, next) {
    User.findOne({ token: req.body.token }).then(user => {
        if (/create-user/.test(req.path)){
            if (user) {
                return res.json({
                    status: 'error',
                    message: "user already exists"
                })
            } else {
                return next();
            }
        }
        if (!user) {
            return res.json({
                status: 'error',
                message: "user not found"
            })
        }
        req.user = user;
        next();
    }).catch(error => {
        next(error)
    })
}