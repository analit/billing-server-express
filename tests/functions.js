const dateFormat = require('dateformat')
const app = require("../app")
const request = require("supertest")

const TOKEN = "1234567898765432-ETS"

module.exports.generateId = () => {
    return Math.ceil(Math.random() * 1000000000)
}

module.exports.TOKEN = TOKEN

module.exports.date = () => {
    return dateFormat(new Date(), "yyyy-mm-dd H:MM:ss")
}

module.exports.createDefaultUser = async (done) => {
    await request(app).post("/api/create-user").send({
        currency: "USD",
        balance: 100,
        token: TOKEN,
        id: 123456
    })
    done()
}

module.exports.removeDefaultUser = async (done) => {
    const response = await request(app).post("/api/delete-user").send({
        token: TOKEN
    })
    done();
}