const User = require('../../models/user')

module.exports = class {
    async createBody(req) {
        await User.deleteOne({ _id: req.user._id })
        return {}
    }
}