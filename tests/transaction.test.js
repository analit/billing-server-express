const request = require("supertest");
const app = require("../app");
const functions = require('./functions');
const ErrorBilling = require("../services/response/ErrorBilling");

describe('Transaction', () => {

    beforeEach(functions.createDefaultUser);
    afterEach(functions.removeDefaultUser);
    afterAll(app.closeDbConnection);

    test('Low balance', async(done) => {
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
    });

    test('Balance plus', async(done) => {
        const id = functions.generateId();
        const transactionRequest = {
            name: 'transaction',
            id: id,
            timestamp: functions.date(),
            session: 'aserdfsh65764',
            plus: 100,
            minus: 0,
            token: functions.TOKEN
        };
        const transactionResponse = {
            id: id,
            balance: {
                value: 200,
                version: 1
            }
        };

        const response = await request(app).post("/billing").send(transactionRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(transactionResponse);
        done()
    });

    test('Balance minus', async(done) => {

        let transactionRequest = {
            name: 'transaction',
            id: functions.generateId(),
            timestamp: functions.date(),
            session: 'aserdfsh65764',
            plus: 100,
            minus: 0,
            token: functions.TOKEN
        };
        const id = functions.generateId();
        const transactionResponse = {
            id: id,
            balance: {
                value: 150,
                version: 2
            }
        };

        await request(app).post("/billing").send(transactionRequest);
        transactionRequest = {...transactionRequest, ... { plus: 0, minus: 50, id: id } };
        const response = await request(app).post("/billing").send(transactionRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(transactionResponse);
        done()
    })
});