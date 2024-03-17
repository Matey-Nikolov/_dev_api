import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';

import app from '../server.js';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

import mockDataPage1 from './mock data/alerts/alerts1.json' assert { type: 'json' };
import mockDataPage2 from './mock data/alerts/alerts2.json' assert { type: 'json' };

const expect = chai.expect;
const request = supertest(app);

let callCount = 0;

const pathFromBaseURL = 'api.central.sophos.com';
const pathFromURL = 'common/v1/alerts';

const uniqueId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
const access_Id = 's458-585934sadas56dfdsf-sddasdfs-sfdsd45asd64we';
const accessToken = 'b'.repeat(800);

describe('/alerts', () => {

    beforeEach(() => {
        getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
        
        nock(`https://${pathFromBaseURL}`)
        .persist()
        .get(`/${pathFromURL}`)
        .query(true)
        .reply(200, () => {
            callCount++;
            if (callCount === 1) {
                return mockDataPage1;
            } else if (callCount === 2) {
                return mockDataPage2;
            }
        })
        .get(`/${pathFromURL}`)
        .replyWithError('Error get data for alerts.');
    });
    
    it('should return the correct data', async () => {
        const res = await request
        .get('/alert')
        .query({ 
            clientId: 's458-58593456dfdsf-sddfs-s34fdsd4564we' 
        });
        
        // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal([...mockDataPage1.items, ...mockDataPage2.items]);
    });

    it('should return 400 if clientId is not provided', async () => {
        const res = await request.get('/alert');

        expect(res.status).to.equal(400);
        expect(res.body.errors).to.exist;
    });
});

describe('/alerts/actions', () => {
    const mockClientId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
    const mockAlertId = 'a2378987-alqweedqwefrtId-alqwdeertId';
    const mockAction = 'acknowledge';

    const addData = 
    {
        "action": mockAction,
        "message": "Remove WinExeSvc"
    };


    const mockResponse = { 
        "id": "",
        "alertId": "",
        "action": "acknowledge",
        "status": "completed",
        "requestedAt": "",
        "completedAt": "",
        "startedAt": "",
        "result": "success"
    };

    beforeEach(() => {
        getApiConfigurationInstance(uniqueId);

        nock(`https://${pathFromBaseURL}`)
        .post(`//common/v1/alerts/${mockAlertId}/actions`, addData)
        .reply(200, mockResponse);
    });

    it('should return the correct result for action - success', async () => {
        const res = await request
        .get(`/alert/actions`)
        .query({ 
            clientId: mockClientId,
            alertId: mockAlertId,
            action: mockAction
        });
    
        // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ status: mockResponse.result });
    });

    it('should return 400 if data is not  fully provided. Missing action', async () => {
        const res = await request
        .get(`/alert/actions`)
        .query({ 
            clientId: mockClientId,
            alertId: mockAlertId
        });

        expect(res.status).to.equal(400);
    });
});