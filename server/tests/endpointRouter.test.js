import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';

import app from '../server.js';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

import mockDataPage1 from './mock data/endpoints/endpoints1.json' assert { type: 'json' };
import mockDataPage2 from './mock data/endpoints/endpoints2.json' assert { type: 'json' };
import mockDataDetails from './mock data/endpoints/endpointDetails.json' assert { type: 'json' };
import mockDataSowftware from './mock data/endpoints/endpointSoftware.json' assert { type: 'json' };

const expect = chai.expect;
const request = supertest(app);

let callCount = 0;

const pathFromBaseURL = 'api.central.sophos.com';
const pathFromURL = 'endpoint/v1/endpoints';

const uniqueId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
const access_Id = 's458-585934sadas56dfdsf-sddasdfs-sfdsd45asd64we';
const accessToken = 'b'.repeat(800);

const mockClientIdFake = 'qw-a-eqweqwe-qwqwe-vxe45345-435';
const mockMachineId = '7864a8ewr-we0ows-wasderso-pwero334dg';

describe('Management endpoints', () => {

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
            .replyWithError('Error get data for endpoints.');

        nock(`https://${pathFromBaseURL}`)
            .get(`/endpoint/v1/endpoints/${mockMachineId}?view=full`)
            .reply(200, { data: mockDataDetails });

        nock(`https://${pathFromBaseURL}`)
            .get(`/endpoint/v1/endpoints/${mockMachineId}?view=full`)
            .replyWithError('Error get details for current endpoint:');
    });

    describe('List endpoints', () => {
        it('Should return the correct data - all endpoints', async () => {
            const res = await request
                .get('/endpoint')
                .query({ clientId: uniqueId });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal([...mockDataPage1.items, ...mockDataPage2.items]);
        });

        it('Should return 400 if data is not fully provided. Minimum length of ID is 35.', async () => {
            const res = await request
                .get('/endpoint')
                .query({ 
                    clientId: mockClientIdFake 
                });

            expect(res.status).to.equal(400);
        });

        it('Should return 400 if there is an error while fetching data from the API', async () => {
            const res = await request
                .get('/endpoint')
                .query({ 
                    clientId: uniqueId 
                });

            expect(res.status).to.equal(400);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Error get data for endpoints.');
        });
    });

    describe('Details endpoint', () => {
        it('Should return details for the provided machine ID and client ID', async () => {
            const res = await request
                .get('/endpoint/details')
                .query({ 
                    machine_Id: mockMachineId, 
                    clientId: uniqueId 
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ 
                data: mockDataDetails 
            });
        });

        it('Should return 400 if machine ID or client ID is not provided or does not meet the minimum length requirement', async () => {
            const res1 = await request
                .get('/endpoint/details');

            expect(res1.status).to.equal(400);

            const res2 = await request
                .get('/endpoint/details')
                .query({ 
                    machine_Id: 'machine-short-id', 
                    clientId: 'short-id' 
                });

            expect(res2.status).to.equal(400);
        });

        it('Should return 500 if there is an error while fetching details from the API', async () => {
            const res = await request
                .get('/endpoint/details')
                .query({ 
                    machine_Id: mockMachineId, 
                    clientId: uniqueId 
                });

            expect(res.status).to.equal(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Error get details for current endpoint:');
        });
    });

    describe('Scan endpoint', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId);
    
            nock(`https://${pathFromBaseURL}`)
                .post(`/endpoint/v1/endpoints/${mockMachineId}/scans`, {})
                .reply(200, 
                    { 
                        id: '8066', 
                        status: 'requested', 
                        requestedAt: '2024-03-17T10:32:42.068258164Z' 
                    });
        });
    
        it('Should return scan data for the provided machine ID and client ID', async () => {
            const res = await request
                .get('/endpoint/scan')
                .query({ 
                    machine_Id: mockMachineId, 
                    clientId: uniqueId 
                });
    
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(
                { 
                    id: '8066', 
                    status: 'requested', 
                    requestedAt: '2024-03-17T10:32:42.068258164Z' 
                });
        });
    
        it('Should return 400 if machine ID or client ID is not provided or does not meet the minimum length requirement', async () => {
            const res1 = await request
                .get('/endpoint/scan')
                .query({ 
                    machine_Id: 'invalid-id', 
                    clientId: 'short-id' 
                });
    
            expect(res1.status).to.equal(400);
    
            const res2 = await request
                .get('/endpoint/scan')
                .query({ 
                    clientId: uniqueId 
                });
    
            expect(res2.status).to.equal(400);
        });    
    });

    describe('Update endpoint', () => {
        const mockDataValid = {
            "id": "187c48066",
            "status": "requested",
            "requestedAt": "2024-03-17T11:07:13.426749441Z"
        };

        const mockDataInvalid = {
            "error": "badRequest",
            "correlationId": "retert-234",
            "requestId": "4e928d",
            "createdAt": "2024-03",
            "message": "Invalid request"
        };

        beforeEach(() => {
            getApiConfigurationInstance(uniqueId);
        
            nock(`https://${pathFromBaseURL}`)
                .post(`/endpoint/v1/endpoints/${mockMachineId}/update-checks`, {})
                .reply(200, mockDataValid);
        
            nock(`https://${pathFromBaseURL}`)
                .post(`/endpoint/v1/endpoints/${mockMachineId}/update-checks`, {})
                .reply(400, mockDataInvalid);
        });
        
        it('Should return update data for the provided machine ID and client ID', async () => {
            const res = await request
                .get('/endpoint/update')
                .query({ 
                    machine_Id: mockMachineId, 
                    clientId: uniqueId 
                });
        
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockDataValid);
        });
        
        it('Should return 400 if machine ID or client ID is not provided or does not meet the minimum length requirement', async () => {
            const res1 = await request
                .get('/endpoint/update')
                .query({ 
                    machine_Id: 'invalid-id', 
                    clientId: 'short-id' 
                });
        
            expect(res1.status).to.equal(400);
        
            const res2 = await request
                .get('/endpoint/update')
                .query({ 
                    clientId: uniqueId 
                });
        
            expect(res2.status).to.equal(400);
        });
    });

    describe('Software endpoint', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId);
        
            nock(`https://${pathFromBaseURL}`)
                .get(`/endpoint/v1/downloads`)
                .reply(200, mockDataSowftware);
        
            nock(`https://${pathFromBaseURL}`)
                .get(`/endpoint/v1/downloads`)
                .reply(400, {
                    success: false,
                    message: 'Error get software.'
                });
        });
        
        it('Should return software data for the provided client ID', async () => {
            const res = await request
                .get('/endpoint/software')
                .query({ clientId: uniqueId });
        
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockDataSowftware);
        });
        
        it('Should return 400 if client ID is not provided or does not meet the minimum length requirement', async () => {
            const res = await request
                .get('/endpoint/software')
                .query({ 
                    clientId: 'short-id' 
                });
        
            expect(res.status).to.equal(400);
        });
    
        it('Should return 400 if there is an error while fetching software data from the API', async () => {
            const res = await request
                .get('/endpoint/software')
                .query({ 
                    clientId: uniqueId 
                });
        
            expect(res.status).to.equal(400);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Error get software.');
        });
    });
    
});
