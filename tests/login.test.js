const request = require("supertest")
const app = require("../app")
const dateFormat = require("dateformat")
const ErrorBilling = require("../services/response/ErrorBilling")
const dbConnection = require('../services/db');
const functions = require('./functions');

describe("Login", () => {
    beforeEach(functions.createDefaultUser);

    afterEach(functions.removeDefaultUser)

    test("login fail", async (done) => {
        const id = functions.generateId();
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
                code: ErrorBilling.TOKEN_NOT_FOUND,
            }
        }
        const response = await request(app).post("/billing").send(loginRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(loginErrorResponse)
        done();
    })

    test('login successfull', async (done) => {
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