const request = require("supertest")
const app = require("../app")
const dateFormat = require("dateformat")
const ErrorBilling = require("../services/response/ErrorBilling")
const dbConnection = require('../services/db');

describe("Login", () => {
    beforeEach(async () => {
        const response = await request(app).post("/api/create-user").send({
            "currency": "USD",
            "balance": 100,
            "token": "1234567898765432-ET",
            "id": 123456
        })
        // console.log(response.statusCode, response.body)
    });
    test("login fail", async (done) => {
        const id = Math.ceil(Math.random() * 1000000000);
        const loginRequest = {
            name: "login",
            id: id,
            timestamp: dateFormat(new Date(), "yyyy-mm-dd H:MM:ss"),
            session: 'aserdfsh65764',
            token: '123456789'
        }
        const loginErrorResponse = {
            id: id,
            error: {
                type: ErrorBilling.TOKEN_NOT_FOUND,
            }
        }
        const loginResponse = {
            id: id,
            user: {
                id: 123456789,
                currency: "EUR"
            },
            balance: {
                value: 1000,
                version: 0
            }

        }
        const response = await request(app).post("/billing").send(loginRequest)
        console.log(response.body);
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(loginErrorResponse)
        done();
    })
})

afterAll(async done => {
    await dbConnection.close();
    done();
})