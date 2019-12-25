const request = require("supertest");
const app = require("../app");
const functions = require('./functions');
const ErrorBilling = require("../services/response/ErrorBilling");

describe('Sync', () => {

    beforeEach(functions.createDefaultUser);
    afterEach(functions.removeDefaultUser);
    afterAll(app.closeDbConnection);

    test('Sync error', async(done) => {
        const id = functions.generateId();
        const syncRequest = {
            name: "sync",
            id: id,
            timestamp: functions.date(),
            session: "aserdfsh65764",
            token: "123456",
        }
        const transactionResponse = {
            id: id,
            error: {
                code: ErrorBilling.TOKEN_NOT_FOUND
            }
        };
        const response = await request(app).post("/billing").send(syncRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(transactionResponse);
        done()
    });

    test('Sync successful', async(done) => {
        const id = functions.generateId();
        const syncRequest = {
            name: "sync",
            id: id,
            timestamp: functions.date(),
            session: "aserdfsh65764",
            token: functions.TOKEN,
        }
        const transactionResponse = {
            id: id,
            balance: {
                value: 100,
                version: 0
            }
        };
        const response = await request(app).post("/billing").send(syncRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(transactionResponse);
        done()
    })
})