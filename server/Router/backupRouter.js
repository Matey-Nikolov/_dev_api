import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

import createFileForBackup from '../help/createFile.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const router = express.Router();
const api = getApiConfigurationInstance();

let pathFromURL = ``; 

router.get(
    '/items',
    async (req, res) => {
        pathFromURL = `endpoint/v1/settings/allowed-items?pageTotal=true`;

        const apiItems = api.apiGetConfiguration(pathFromURL);


        try{
            const gettAllItems = await apiItems.get();

            createFileForBackup(gettAllItems.data, 'allowed-items');
            
            res.json(
                { 
                    'status': 201
                }
            );
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

router.get(
    '/items/blocks',
    async (req, res) => {
        pathFromURL = `/endpoint/v1/settings/blocked-items?pageSize=50&pageTotal=true`;

        const apiItemsBlock = api.apiGetConfiguration(pathFromURL);

        try{
            const allBlockItems = await apiItemsBlock.get();

            createFileForBackup(allBlockItems.data, 'block items');
            
            res.json(
                { 
                    'status': 201
                }
            );
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

router.get(
    '/policies',
    async (req, res) => {

        pathFromURL = `/endpoint/v1/policies?pageSize=100&pageTotal=true`;

        const apiPolicies = api.apiGetConfiguration(pathFromURL);

        try{
            const allPolicies = await apiPolicies.get();

            createFileForBackup(allPolicies.data, 'policies');
            
            res.json(
                { 
                    'status': 201
                }
            );
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

export default router;