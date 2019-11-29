const request = require("supertest")
const app = require("../app")
const dateFormat = require("dateformat")

describe("Login", () => {
    test("login succesful", async () => {
        const id = Math.ceil(Math.random() * 1000000000);
        const loginRequest = {
            name: "login",
            id: id,
            timestamp: dateFormat(new Date(), "yyyy-mm-dd H:MM:ss"),
            session: 'aserdfsh65764',
            token: '123456789'
        }
        const loginResponse = {
            id: id,
            user: {
                id: "",
                currency: "EUR"
            },
            balance: {
                value: 0,
                version: 0
            }

        }
        const response = await request(app).post("/billing").send(loginRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(loginResponse)
    })
})