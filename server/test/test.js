import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock'

import app from '../server.js';

const expect = chai.expect;
const request = supertest(app);

describe('Token API tests', () => {
    it('should return 400 on POST /token - wrong data', (done) => {
        request.post('/token')
            .send(
                { 
                    client_Id_Db: 'short', 
                    client_secret_Db: 'short' 
                }) 
            .expect(400)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                expect(res.body.errors).to.be.an('array');
                done();
            });
    });

    it('should return success on POST /token - correct data', (done) => {

        //https://github.com/nock/nock
        nock('https://id.sophos.com')
        .post('/api/v2/oauth2/token', body => {
            expect(body.client_id).to.equal('longEnoughClientIdDblongEnoughClientIdDb');
            expect(body.client_secret).to.equal('longEnoughClientSecretDblongEnoughClientSecretDb');
    
            return true;
        })
        .reply(200, { 
            access_token: "",
            errorCode: "success",
            expires_in: 3600,
            message: "OK",
            refresh_token: "",
            token_type: "",
            trackingId: "" 
        });
    
        request.post('/token')
            .send(
                { 
                    client_Id_Db: 'longEnoughClientIdDblongEnoughClientIdDb', 
                    client_secret_Db: 'longEnoughClientSecretDblongEnoughClientSecretDb' 
                }) 
            .expect(200)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                expect(res.body.success).to.be.true;
                expect(res.body.message).to.equal('Token received successfully');
                expect(res.body.responseData.errorCode).to.equal('success');
                expect(res.body.responseData.message).to.equal('OK');
                
                done();
            });
    });
    
    it('should return 500 on POST /token - API does not approve', (done) => {

        nock('https://id.sophos.com')
            .post('/api/v2/oauth2/token')
            .reply(400, { 
                errorCode: "error",
                message: "Invalid request",
            });

        request.post('/token')
            .send(
                { 
                    client_Id_Db: 'longEnoughClientIdDblongEnoughClientIdDb', 
                    client_secret_Db: 'longEnoughClientSecretDblongEnoughClientSecretDb' 
                }) 
            .expect(500)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                expect(res.body.success).to.be.false;
                expect(res.body.message).to.equal('Error posting data to external URL');
                done();
            });
    });

});