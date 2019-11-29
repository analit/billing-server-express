const router = require("express").Router()

router.post("/", function (req, res, next) {
    res.json({
        id: req.body.id,
        user: {
            id: "123456",
            currency: "EUR"
        },
        balance: {
            value: 10000,
            version: 0
        }
    })
})

module.exports = router;