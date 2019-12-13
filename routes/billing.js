const express = require('express')
const ResponseFactory = require('../services/response/ResponseFactory')
const ErrorBulling = require('../services/response/ErrorBilling')
const checkCash = require('../middleware/checkCacheBilling')
const checkToken = require('../middleware/checkToken')

const router = express.Router();

router.use(checkCash)
router.use(checkToken)


router.post('/', function(req, res, next) {
    const response = (new ResponseFactory()).getResponse(req.body.name, req.body.id)
    try {
        const responseBody = response.createBody(req.body)
        responseBody.id = req.body.id
        res.json(responseBody)
    } catch (e) {
        if (e instanceof ErrorBulling) {
            res.json({
                id: req.body.id,
                error: {
                    code: e.type,
                    message: e.message
                }
            })
        }
        next(e)
    }
});

module.exports = router;