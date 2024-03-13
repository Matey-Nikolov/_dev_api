import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock'

import app from '../server.js';

const expect = chai.expect;
const request = supertest(app);

describe('access', () => {

    it('should return 400 if accessToken is too short', async () => {
        const res = await request.get('/access').query({ accessToken: 'shortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshortshort' });

        expect(res.status).to.equal(400);
        expect(res.body.errors).to.be.an('array');
    });

    it('should return 200 and authorization successful message for valid accessToken', async () => {
        nock('https://api.central.sophos.com')
            .get('/whoami/v1')
            .reply(200, { 
                id: "swc38293-c1f1-2mk5-323-7sd84f3",
                idType: "tenant",
                apiHosts: {
                    global: "https://api.central.sophos.com",
                }
            });
    
        const res = await request
        .get('/access')
        .query({ 
            accessToken: 'a'.repeat(800) 
        });
        
        expect(res.status).to.equal(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Authorization successful');

        expect(res.body.responseData.id).to.equal('swc38293-c1f1-2mk5-323-7sd84f3');
        expect(res.body.responseData.idType).to.equal('tenant');
        expect(res.body.responseData.apiHosts.global).to.equal('https://api.central.sophos.com');
    });    

    it('should return 400 if external API call fails', async () => {
        nock('https://api.central.sophos.com')
            .get('/whoami/v1')
            .reply(400);

        const res = await request.get('/access').query({ accessToken: 'b'.repeat(800) });

        expect(res.status).to.equal(400);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal('Error processing request authorization.');
    });
});