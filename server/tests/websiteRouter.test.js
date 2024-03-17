import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';

import app from '../server.js';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const expect = chai.expect;
const request = supertest(app);

const pathFromBaseURL = 'api.central.sophos.com';
const pathFromURL = '/endpoint/v1/settings/web-control/local-sites';

const uniqueId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
const access_Id = 's458-585934sadas56dfdsf-sddasdfs-sfdsd45asd64we';
const accessToken = 'b'.repeat(800);

const mockClientIdFake = '7wewr-we0ows-websiteId-pweero334dg';
const mockWebsite_Id_Fake = '7werewr--pweero334dg';

const mockWebsite_Id = '7werewr-we0ows-websiteId-pweero334dg';

const mockData = {
    items: [
        {
            "id": "1",
            "tags": [
                "BLOCK"
            ],
            "url": "dir.bg",
            "comment": "Add"
        },
        {
            "id": "2",
            "tags": [
                "ALLOW"
            ],
            "url": "msedge.b.tlu.dl.delivery.mp.microsoft.com",
            "comment": "Add"
        },
        {
            "id": "3",
            "tags": [
                "ALLOW",
                "BLOCK"
            ],
            "url": "web-control-automation.com",
            "comment": "Web Control Automation"
        }
    ],
    pages: {
        "current": 1,
        "size": 50,
        "total": 1,
        "items": 3,
        "maxSize": 100
    }
};


describe('Management websites', () => {

    beforeEach(() => {
        getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);

        nock(`https://${pathFromBaseURL}`)
            .persist()
            .get(`/${pathFromURL}`)
            .query(true)
            .reply(200, mockData);
    });

    describe('List websites', () => {
        it('Should return the correct data - all websites', async () => {
            const response = await request
                .get('/website')
                .query({ 
                    clientId: uniqueId 
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(mockData);
        });

        it('Should return 400 if data is not fully provided. Minimum length of ID is 35.', async () => {
            const response = await request
                .get('/website')
                .query({ 
                    clientId: mockClientIdFake 
                });

            expect(response.status).to.equal(400);
        });
    });

    describe('Delete website', () => {
        const mockDataErrorDelete = {
            "error": "badRequest",
            "correlationId": "a01120",
            "requestId": "d72fe7",
            "createdAt": "2024-03-17T11:57",
            "message": "Invalid request"
        };

        beforeEach(() => {
            getApiConfigurationInstance(uniqueId);

            nock(`https://${pathFromBaseURL}`)
                .delete(`${pathFromURL}/${mockWebsite_Id}`)
                .reply(200, { 
                    deleted: true 
                });

            nock(`https://${pathFromBaseURL}`)
                .delete(`/${pathFromURL}/${mockWebsite_Id}`)
                .reply(400, mockDataErrorDelete);
        });

        it('Should delete the website successfully', async () => {
            const response = await request
                .get('/website/delete')
                .query({
                    website_Id: mockWebsite_Id, 
                    clientId: uniqueId 
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.be.true;
        });
        
        it('Should return 400 if data is not fully provided. Minimum length of ID is 35.', async () => {
            const response = await request
                .get('/website/delete')
                .query({ 
                    website_Id: mockWebsite_Id_Fake, 
                    clientId: mockClientIdFake 
                });

            expect(response.status).to.equal(400);
        });
        /*
        it('Should return 400 if there is an error while deleting the website', async () => {
            const response = await request
                .get('/website/delete')
                .query({ 
                    website_Id: mockWebsite_Id, 
                    clientId: uniqueId 
                });

                expect(response.status).to.equal(400);
                expect(response.body.error).to.equal('badRequest');
                expect(response.body.correlationId).to.equal('a01120');
                expect(response.body.requestId).to.equal('d72fe7');
        });
        */
    });

    describe('Add website', () => {
        const url = 'www.example.com';

        const addData = 
            JSON.stringify({
            "tags": ["ALLOW"],
            "url": url,
            "comment": "Add by Matey - soon custom comments."
        });

        const expectedResponse = {
            "status": 200,
            "information": {
                "id": "27",
                "categoryId": 50,
                "url": "www.example.com",
                "comment": "Add by Matey - soon custom comments."
            }
        }
        
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId);

            nock('https://api.central.sophos.com')
            .post('/endpoint/v1/settings/web-control/local-sites', addData)
            .reply(200, {
                status: 200,
                information: expectedResponse.information
            });

            nock(`https://${pathFromBaseURL}`)
            .post('/endpoint/v1/settings/web-control/local-sites', addData)
            .replyWithError('Error adding website');
        });
    
        it('Should add a website successfully', async () => {
            const response = await request
                .get('/website/add')
                .query({ 
                    url: url, 
                    clientId: uniqueId 
                });

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal(200);
            expect(response.body.information).to.deep.equal(expectedResponse);
        });
    
        
        it('Should return 400 if URL is not provided', async () => {
            const response = await request
                .get('/website/add')
                .query({ 
                    clientId: uniqueId 
                });
    
            expect(response.status).to.equal(400);
            expect(response.body.errors).to.be.an('array').that.is.not.empty;
        });
    
        it('Should return 400 if client ID is not provided', async () => {
            const response = await request
                .get('/website/add')
                .query({ 
                    url: url
                });
    
            expect(response.status).to.equal(400);
            expect(response.body.errors).to.be.an('array').that.is.not.empty;
        });
        /*
        it('Should handle errors from the API', async () => {
            const response = await request
                .get('/website/add')
                .query({ 
                    url: url, 
                    clientId: uniqueId 
                });
    
            expect(response.status).to.equal(500);
            expect(response.body.success).to.be.false;
            expect(response.body.message).to.equal('Error adding website');
        });
        */
    });
});