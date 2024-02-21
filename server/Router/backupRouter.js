import { express, query } from '../globalImports.js';

import createFileForBackup from '../help/createFile.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const router = express.Router();

let pathFromURL = ``; 

router.get(
    '/items',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        pathFromURL = `endpoint/v1/settings/allowed-items?pageTotal=true`;

        const { clientId } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiItems = api.apiGetConfiguration(pathFromURL);

        try{
            const gettAllItems = await apiItems.get();

            createFileForBackup(gettAllItems.data, 'allowed-items');
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'items'
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
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        pathFromURL = `/endpoint/v1/settings/blocked-items?pageSize=50&pageTotal=true`;

        const { clientId } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiItemsBlock = api.apiGetConfiguration(pathFromURL);

        try{
            const allBlockItems = await apiItemsBlock.get();

            createFileForBackup(allBlockItems.data, 'block items');
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'block items'
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
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        pathFromURL = `/endpoint/v1/policies?pageSize=100&pageTotal=true`;

        const { clientId } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiPolicies = api.apiGetConfiguration(pathFromURL);

        try{
            const allPolicies = await apiPolicies.get();

            createFileForBackup(allPolicies.data, 'policies');
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'policies'
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