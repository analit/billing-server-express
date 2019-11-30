const express = require('express');
const ResponseFactory = require('../service/response/ResponseFactory')
const ErrorBulling = require('../service/response/ErrorBilling')

const router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
    const response = (new ResponseFactory()).getResponse(req.body.name, req.body.id)
    try {
        const responseBody = response.createBody()
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