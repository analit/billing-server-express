const express = require('express')
const router = express.Router()

router.post('/create-user', function(req, res, next) {
    const response = {
        status: "success",
        message: "user was created",
        currency: "ETH",
        balance: "100",
        token: "1234567898765432-ETH",
        "trx-id": "1157603850"
    }
    res.json(response)
})

router.post('/delete-user', function(req, res, next) {

})

router.post('/cashin-user', function(req, res, next) {

})

router.post('/cashout-user', function(req, res, next) {

})

router.post('/get-balance', function(req, res, next) {

})

module.exports = router