const express = require('express')
const User = require('../models/user')
const checkUser = require('../middleware/checkUser')

const router = express.Router()
router.use(checkUser)

router.post('/create-user', function(req, res, next) {

    const user = new User({
        token: req.body.token,
        currency: req.body.currency,
        balance: req.body.balance
    })

    user.save()
        .then((user) => {
            const response = {
                status: "success",
                message: "user was created",
                currency: user.currency,
                balance: user.balance,
                token: user.token,
                "trx-id": "1157603850"
            }
            res.json(response)
        })
        .catch((error) => next(error));
})

router.post('/delete-user', function(req, res, next) {
    User.deleteOne({ token: req.body.token })
        .then(() => res.json({
            status: "success",
            message: "user was deleted",
            "trx-id": "1157603850"
        }))
        .catch(error => next(error))
})

router.post('/cashin-user', function(req, res, next) {
    const user = req.user;
    user.balance += req.body.amount;
    user.version += 1;
    user.save()
        .then(user => {
            res.json({
                status: "success",
                message: "balance was updated",
                token: user.token,
                currency: user.currency,
                balance: user.balance,
                "trx-id": "1157603851"
            })
        })
        .catch(error => next(error))
})

router.post('/cashout-user', function(req, res, next) {
    const user = req.user;
    if (user.balance < req.body.amount) {
        return res.json({
            status: "error",
            message: "low balance"
        })
    }
    user.balance -= req.body.amount;
    user.version += 1;
    user.save()
        .then(user => {
            res.json({
                status: "success",
                message: "balance was updated",
                token: user.token,
                currency: user.currency,
                balance: user.balance,
                "trx-id": "1157603851"
            })
        })
        .catch(error => next(error))
})

router.post('/get-balance', function(req, res, next) {

})

module.exports = router