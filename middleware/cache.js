const Cache = require("node-cache");

const cache = new Cache({stdTTL: 5 * 60})

function getCacheKey(req) {
    const prefix = /api/.test(req.path) ? "api" : "billing";
    return `${prefix}_${req.body.id}`;
}

module.exports.get = function (req, res, next) {
    const content = cache.get(getCacheKey(req));
    if (content) {
        return res.json(content);
    }
    next();
}

module.exports.set = function (req, res, next) {
    /** save api response */
    if (res.body && res.body.status) {
        res.body.status === "success" && cache.set(getCacheKey(req), res.body);
        return next();
    }

    /** save billing response */
    res.body && !res.body.error && cache.set(getCacheKey(req), res.body)

    next();
}