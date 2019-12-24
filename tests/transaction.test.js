const request = require("supertest");
const app = require("../app");
const functions = require('./functions');
const ErrorBilling = require("../services/response/ErrorBilling");
// const dbConnection = require('../services/db');


describe('Transaction', () => {

    beforeEach(functions.createDefaultUser);
    afterEach(functions.removeDefaultUser);

    test('Low balance', async (done) => {
        const id = functions.generateId();
        const transactionRequest = {
            name: 'transaction',
            id: id,
            timestamp: functions.date(),
            session: 'aserdfsh65764',
            plus: 0,
            minus: 100000,
            token: functions.TOKEN
        };
        const transactionResponse = {
            id: id,
            error: {
                code: ErrorBilling.LOW_BALANCE
            }
        };

        const response = await request(app).post("/billing").send(transactionRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(transactionResponse);
        done()
    })
})

afterAll(async done => {
    // await dbConnection.close();
    // done();
   await app.closeDb();
   
})