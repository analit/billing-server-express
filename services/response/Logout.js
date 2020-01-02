const User = require('../../models/user')

module.exports = class {
    async createBody(req) {
        await User.remove({ _id: req.user._id })
        return {}
    }
}