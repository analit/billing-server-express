module.exports = function(req, res, next) {
    console.log('check cache')
    next()
}