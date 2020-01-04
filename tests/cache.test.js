const request = require("supertest");
const app = require("../app");
const functions = require("./functions");
const ErrorBilling = require("../services/response/ErrorBilling");

describe('Cache', () => {
    beforeEach(functions.createDefaultUser);
    afterEach(functions.removeDefaultUser);
    afterAll(app.closeDbConnection);

    test('Cache api', async (done) => {
        let id = functions.generateId();
        let cashinRequest = {
            token: functions.TOKEN,
            amount: 100,
            id: id
        }
        let cashinResponse = {
            status: "success",
            message: "balance was updated",
            token: functions.TOKEN,
            currency: "USD",
            balance: 200
        }

        let response = await request(app).post("/api/cashin-user").send(cashinRequest);
        expect(response.body).toMatchObject(cashinResponse);

        response = await request(app).post("/api/cashin-user").send(cashinRequest);
        expect(response.body).toMatchObject(cashinResponse);

        id = functions.generateId();
        cashinRequest = {
            token: 'LEFT-TOKEN',
            amount: 100,
            id: id
        }
        cashinResponse = {
            status: "error",
            message: "user not found"
        }
        response = await request(app).post("/api/cashin-user").send(cashinRequest);
        expect(response.body).toMatchObject(cashinResponse);

        cashinRequest = {...cashinRequest, token: functions.TOKEN}
        cashinResponse = {
            status: "success",
            message: "balance was updated",
            token: functions.TOKEN,
            currency: "USD",
            balance: 300
        }

        response = await request(app).post("/api/cashin-user").send(cashinRequest);
        expect(response.body).toMatchObject(cashinResponse);

        done();
    })
})