const express = require('express')
const ResponseFactory = require('../services/response/ResponseFactory')
const checkToken = require('../middleware/checkToken')

const router = express.Router();

router.use(checkToken)

router.post('/', async function(req, res, next) {
    try {
        const response = (new ResponseFactory()).getResponse(req.body.name)
        const responseBody = await response.createBody(req)
        responseBody.id = req.body.id
        res.body = responseBody;
        next()
    } catch (e) {
        next(e)
    }
});

module.exports = router;