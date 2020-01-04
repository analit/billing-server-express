const request = require("supertest");
const app = require("../app");
const functions = require("./functions");
const ErrorBilling = require("../services/response/ErrorBilling");

describe('Logout', () => {

    beforeEach(functions.createDefaultUser);
    afterEach(functions.removeDefaultUser);
    afterAll(app.closeDbConnection);

    test('Logout successfull', async (done) => { 
        let id = functions.generateId();
        const logoutRequest = {
            name: "logout",
            id: id,
            timestamp: functions.date(),
            session: "aserdfsh65764",
            token: functions.TOKEN,
        }
        const logoutResponse = {
            id: id
        }

        let response = await request(app).post("/billing").send(logoutRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(logoutResponse);

        id = functions.generateId();
        const syncRequest = {
            name: "sync",
            id: id,
            timestamp: functions.date(),
            session: "aserdfsh65764",
            token: functions.TOKEN,
        }
        const syncResponse = {
            id: id,
            error: {
                code: ErrorBilling.TOKEN_NOT_FOUND
            }
        };

        response = await request(app).post("/billing").send(syncRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(syncResponse);

        done()
    })
})
