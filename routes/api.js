const express = require('express')
const User = require('../models/user')
const checkUser = require('../middleware/checkUser')

const router = express.Router()

router.post('*', checkUser);

router.post('/create-user', function (req, res, next) {

    const user = new User({
        token: req.body.token,
        currency: req.body.currency,
        balance: req.body.balance
    })

    user.save()
        .then((user) => {
            res.body = {
                status: "success",
                message: "user was created",
                currency: user.currency,
                balance: user.balance,
                token: user.token
            }
            next();
        })
        .catch((error) => next(error));
})

router.post('/delete-user', function (req, res, next) {
    User.deleteOne({ token: req.body.token })
        .then(() => {
            res.body = {
                status: "success",
                message: "user was deleted"
            }
            next();
        })
        .catch(error => next(error))
})

router.post('/cashin-user', function (req, res, next) {
    const user = req.user;
    user.balance += req.body.amount;
    user.version += 1;
    user.save()
        .then(user => {
            res.body = {
                status: "success",
                message: "balance was updated",
                token: user.token,
                currency: user.currency,
                balance: user.balance
            }
            next();
        })
        .catch(error => next(error))
})

router.post('/cashout-user', function (req, res, next) {
    const user = req.user;
    if (user.balance < req.body.amount) {
        return next(new ErrorApi('low balance'));
    }
    user.balance -= req.body.amount;
    user.version += 1;
    user.save()
        .then(user => {
            res.body = {
                status: "success",
                message: "balance was updated",
                token: user.token,
                currency: user.currency,
                balance: user.balance
            }
            next()
        })
        .catch(error => next(error))
})

router.post('/get-balance', function (req, res, next) {
    const user = req.user;
    res.body = {
        status: "success",
        token: user.token,
        currency: user.currency,
        balance: user.balance
    }
})

module.exports = router