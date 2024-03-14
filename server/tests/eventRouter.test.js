import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js'; // replace with your actual file path

import app from '../server.js';

const expect = chai.expect;
const request = supertest(app);

describe('events', () => {
    const uniqueId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
    const access_Id = 's458-585934sadas56dfdsf-sddasdfs-sfdsd45asd64we';
    const accessToken = 'b'.repeat(800);
    const pathFromBaseURL = 'api.central.sophos.com';
    const pathFromURL = '/siem/v1/events';
    
    const mockData = { 
        has_more: false,
        items: [],
        next_cursor: "VjJfQ1VSU09SfDIwMjQtMDMtMTRUMTY6Mzg6NTkuNjU0Wg=="
    };

    beforeEach(() => {
        getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
        
        nock(`https://${pathFromBaseURL}`)
        .get(`/${pathFromURL}`)
        .reply(200, mockData);

        nock(`https://${pathFromBaseURL}`)
        .get(`/${pathFromURL}`)
        .replyWithError('Error get data for events.');
    });
    

    it('should return the correct data', async () => {
        
        const res = await request
        .get('/events')
        .query({ 
            clientId: 's458-58593456dfdsf-sddfs-s34fdsd4564we' 
        });
        
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(mockData);
    });

    it('should return 400 if clientId is not provided', async () => {
        const res = await request.get('/events');

        expect(res.status).to.equal(400);
        expect(res.body.errors).to.exist;
    });

    it('should return 400 if there is an error when getting data for events', async () => {

        const res = await request
        .get('/events')
        .query({ 
            clientId: 's458-58593456dfdsf-sddfs-s34fdsd4564we' 
        });

        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error get data for events.');
    });
});