const express = require('express')
const ResponseFactory = require('../services/response/ResponseFactory')
const checkCash = require('../middleware/checkCacheBilling')
const checkToken = require('../middleware/checkToken')

const router = express.Router();

router.use(checkCash)
router.use(checkToken)

router.post('/', async function (req, res, next) {
    const response = (new ResponseFactory()).getResponse(req.body.name, req.body.id)
    try {
        const responseBody = await response.createBody(req.body)
        responseBody.id = req.body.id
        res.json(responseBody)
    } catch (e) {
        next(e)
    }
});

module.exports = router;