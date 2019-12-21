const request = require("supertest")
const app = require("../app")
const dateFormat = require("dateformat")
const ErrorBilling = require("../services/response/ErrorBilling")
const dbConnection = require('../services/db');

describe("Login", () => {
    beforeEach(async(done) => {
        const response = await request(app).post("/api/create-user").send({
                "currency": "USD",
                "balance": 100,
                "token": "1234567898765432-ETS",
                "id": 123456
            })
            // console.log(response.statusCode, response.body)
        done()
    });

    afterEach(async(done) => {
        const response = await request(app).post("/api/delete-user").send({
                "token": "1234567898765432-ETS"
            })
            // console.log(response.statusCode, response.body)
        done();
    })

    test("login fail", async(done) => {
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
        const response = await request(app).post("/billing").send(loginRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(loginErrorResponse)
        done();
    })

    test('login successfull', async(done) => {
        const id = Math.ceil(Math.random() * 1000000000);
        const loginRequest = {
            name: "login",
            id: id,
            timestamp: dateFormat(new Date(), "yyyy-mm-dd H:MM:ss"),
            session: 'aserdfsh65764',
            token: '1234567898765432-ETS'
        }
        const loginResponse = {
            id: id,
            user: {
                currency: "USD"
            },
            balance: {
                value: 100,
                version: 0
            }

        }
        const response = await request(app).post("/billing").send(loginRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(loginResponse)
        done()
    })
})

afterAll(async done => {
    await dbConnection.close();
    done();
})