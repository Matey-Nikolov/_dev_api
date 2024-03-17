import * as chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

import app from '../server.js';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

import mockBackupItems from './mock data/backups/items.json' assert { type: 'json' };
import mockBackupItemsBlock from './mock data/backups/itemsBlock.json' assert { type: 'json' };
import mockBackupPolicies from './mock data/backups/policies.json' assert { type: 'json' };
import mockBackupExclusionsScanning from './mock data/backups/exclusionsScanning.json' assert { type: 'json' };
import mockBackupExclusionsDownload from './mock data/backups/exclusionsDownload.json' assert { type: 'json' };

const expect = chai.expect;
const request = supertest(app);

const pathFromBaseURL = 'api.central.sophos.com';

const uniqueId = 's458-58593456dfdsf-sddfs-s34fdsd4564we';
const access_Id = 's458-585934sadas56dfdsf-sddasdfs-sfdsd45asd64we';
const accessToken = 'b'.repeat(800);

describe('Management backups', () => {
    describe('Backup items', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
    
            nock.cleanAll();
            nock(`https://${pathFromBaseURL}`)
                .persist()
                .get(`/endpoint/v1/settings/allowed-items`)
                .query(true)
                .reply(200, {
                    'status': 200,
                    'fileName': 'items',
                    'data': mockBackupItems
                });
        });
    
        it('should return 400 with validation errors if clientId is invalid', async () => {
            const response = await request.get('/backup/items')
                .query({ 
                    clientId: ' '.repeat(30),
                    fileName: 'items file', 
                    folderName: 'folder mock' 
                });
    
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('errors').to.be.an('array');
            expect(response.body.errors).to.have.lengthOf.at.least(1);
            expect(response.body.errors[0]).to.have.property('msg', 'Query parameters cannot be empty');
        });
    
        it('should successfully create backups for items', async () => {
            const response = await request.get('/backup/items')
                .query({ 
                    clientId: uniqueId,
                    fileName: 'items file', 
                    folderName: 'folder mock' 
                });
    
                const mockResponse = { 
                    status: 200,
                    fileName: 'items'
                };
    
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(mockResponse);
    
            const directoryPath = path.join('backups', 'folder mock');
            const files = fs.readdirSync(directoryPath);
        
            const filePath = path.join(directoryPath, files[0]);
            const createdFileContents = fs.readFileSync(filePath, 'utf8');
        
            expect(JSON.parse(createdFileContents).data).to.deep.equal(mockBackupItems);
        
            await fs.promises.unlink(filePath);
        });
    });
   
    describe('Backup items blocks', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
    
            nock.cleanAll();
            nock(`https://${pathFromBaseURL}`)
                .persist()
                .get(`//endpoint/v1/settings/blocked-items`)
                .query(true)
                .reply(201, {
                    'status': 201,
                    'fileName': 'block items',
                    'data': mockBackupItemsBlock
                });
        });
    
        it('should return 400 with validation errors if fileName is invalid', async () => {
            const response = await request.get('/backup/items/blocks')
                .query({ 
                    clientId: uniqueId,
                    fileName: ' '.repeat(30), 
                    folderName: 'folder mock' 
                });
    
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('errors').to.be.an('array');
            expect(response.body.errors).to.have.lengthOf.at.least(1);
            expect(response.body.errors[0]).to.have.property('msg', 'Query parameters cannot be empty');
        });
    
        it('should successfully create backups for blocked items', async () => {
            const response = await request.get('/backup/items/blocks')
                .query({ 
                    clientId: uniqueId,
                    fileName: 'block items file', 
                    folderName: 'folder mock' 
                });
    
            const mockResponse = { 
                'status': 201,
                'fileName': 'block items'
            };
    
            expect(response.body).to.deep.equal(mockResponse);
    
            const directoryPath = path.join('backups', 'folder mock');
            const files = fs.readdirSync(directoryPath);
        
            const filePath = path.join(directoryPath, files[0]);
            const createdFileContents = fs.readFileSync(filePath, 'utf8');
        
            expect(JSON.parse(createdFileContents).data).to.deep.equal(mockBackupItemsBlock);
        
            await fs.promises.unlink(filePath);
        });
    });

    describe('Backup policies', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
    
            nock.cleanAll();
            nock(`https://${pathFromBaseURL}`)
                .persist()
                .get(`//endpoint/v1/policies`)
                .query(true)
                .reply(200, {
                    'status': 200,
                    'fileName': 'policies',
                    'data': mockBackupPolicies
                });
        });
    
        it('should return 400 with validation errors if folderName parameter  is invalid length', async () => {
            const response = await request.get('/backup/policies')
                .query({ 
                    clientId: uniqueId,
                    fileName: 'policies file', 
                    folderName: ' '
                });
    
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('errors').to.be.an('array');
            expect(response.body.errors).to.have.lengthOf.at.least(1);
            expect(response.body.errors[0]).to.have.property('msg', 'Query parameters cannot be empty');
        });
    
        it('should successfully create backups for policies', async () => {
            const response = await request.get('/backup/policies')
                .query({ 
                    clientId: uniqueId,
                    fileName: 'policies file', 
                    folderName: 'folder mock' 
                });
    
            const mockResponse = { 
                'status': 201,
                'fileName': 'policies'
            };
    
            expect(response.body).to.deep.equal(mockResponse);
    
            const directoryPath = path.join('backups', 'folder mock');
            const files = fs.readdirSync(directoryPath);
        
            const filePath = path.join(directoryPath, files[0]);
            const createdFileContents = fs.readFileSync(filePath, 'utf8');
        
            expect(JSON.parse(createdFileContents).data).to.deep.equal(mockBackupPolicies);
        
            await fs.promises.unlink(filePath);
        });
    });

    describe('Backup exclusions scan', () => {
        beforeEach(() => {
            getApiConfigurationInstance(uniqueId, access_Id, accessToken, pathFromBaseURL);
    
            nock.cleanAll();
            nock(`https://${pathFromBaseURL}`)
                .persist()
                .get(`/endpoint/v1/settings/exclusions/scanning`)
                .query(true)
                .reply(200, {
                    'status': 200,
                    'fileName': 'exclusions scan',
                    'data': mockBackupExclusionsScanning
                });
        });
    
        it('should return 400 with validation errors if query parameters are invalid', async () => {
            const response = await request.get('/backup/exclusions/scan')
                .query({ 
                    clientId: ' '.repeat(30),
                    fileName: ' ', 
                    folderName: ' ' 
                });
    
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('errors').to.be.an('array');
            expect(response.body.errors).to.have.lengthOf.at.least(1);
            expect(response.body.errors[0]).to.have.property('msg', 'Query parameters cannot be empty');
        });
    
        it('should successfully create backups for exclusions scan', async () => {
            const response = await request.get('/backup/exclusions/scan')
                .query({ 
                    clientId: uniqueId,
                    fileName: 'exclusions scan file', 
                    folderName: 'folder mock' 
                });
    
            const mockResponse = { 
                'status': 201,
                'fileName': 'exclusions scan'
            };
    
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(mockResponse);
    
            const directoryPath = path.join('backups', 'folder mock');
            const files = fs.readdirSync(directoryPath);
    
            const filePath = path.join(directoryPath, files[0]);
            const createdFileContents = fs.readFileSync(filePath, 'utf8');
    
            expect(JSON.parse(createdFileContents).data).to.deep.equal(mockBackupExclusionsScanning);
    
            fs.unlinkSync(filePath);
        });
    });
});