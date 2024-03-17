import { express, query, validationResult } from '../globalImports.js';

import createFileForBackup from '../help/createFile.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

import callResetBasePolicies from '../help/resetPolicy.js';
import setPolicyForWebControl from '../help/setPolicyWebControl.js';

const router = express.Router();

let pathFromURL = ``; 

router.get(
    '/items',
    [
        query('clientId').isLength({ min: 35 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('fileName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('folderName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),

        query().custom((value, { req }) => {
            if (req.query.clientId.trim() === '' || req.query.fileName.trim() === '' || req.query.folderName.trim() === '') {
                throw new Error('Query parameters cannot be empty');
            };
            return true;
        })
    ],

    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        pathFromURL = `endpoint/v1/settings/allowed-items?pageTotal=true`;

        const { clientId, fileName, folderName } = req.query;

        const api = getApiConfigurationInstance(clientId);
        const apiItems = api.apiGetConfiguration(pathFromURL);

        try{
            const gettAllItems = await apiItems.get();

            createFileForBackup(gettAllItems.data, fileName, folderName);
            
            res.json(
                { 
                    'status': 200,
                    'fileName': 'items'
                }
            );
        }
        catch(error){
            console.error('Error to create backups for items:', error.message);
  
            res.status(400).json({ success: false, message: 'Error to create backups for items' });
        };
    }
);

router.get(
    '/items/blocks',
    [
        query('clientId').isLength({ min: 35 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('fileName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('folderName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),

        query().custom((value, { req }) => {
            if (req.query.clientId.trim() === '' || req.query.fileName.trim() === '' || req.query.folderName.trim() === '') {
                throw new Error('Query parameters cannot be empty');
            };
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        pathFromURL = `/endpoint/v1/settings/blocked-items?pageSize=50&pageTotal=true`;

        const { clientId, fileName, folderName } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiItemsBlock = api.apiGetConfiguration(pathFromURL);

        try{
            const allBlockItems = await apiItemsBlock.get();

            createFileForBackup(allBlockItems.data, fileName, folderName);
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'block items'
                }
            );
        }
        catch(error){
            console.error('Error to create backups for block items:', error.message);
  
            res.status(500).json({ success: false, message: 'Error to create backups for block items' });
        };
    }
);

router.get(
    '/policies',
    [
        query('clientId').isLength({ min: 35 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('fileName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('folderName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        
        query().custom((value, { req }) => {
            if (req.query.clientId.trim() === '' || req.query.fileName.trim() === '' || req.query.folderName.trim() === '') {
                throw new Error('Query parameters cannot be empty');
            };
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        pathFromURL = `/endpoint/v1/policies?pageSize=100&pageTotal=true`;

        const { clientId, fileName, folderName } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiPolicies = api.apiGetConfiguration(pathFromURL);

        try{
            const allPolicies = await apiPolicies.get();

            createFileForBackup(allPolicies.data, fileName, folderName);
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'policies'
                }
            );
        }
        catch(error){
            console.error('Error to create backups for policies:', error.message);
  
            res.status(500).json({ success: false, message: 'Error to create backups for policies' });
        };
    }
);

router.get(
    '/exclusions/scan',
    [
        query('clientId').isLength({ min: 35 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('fileName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('folderName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),

        query().custom((value, { req }) => {
            if (req.query.clientId.trim() === '' || req.query.fileName.trim() === '' || req.query.folderName.trim() === '') {
                throw new Error('Query parameters cannot be empty');
            }
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        pathFromURL = `endpoint/v1/settings/exclusions/scanning?pageSize=50`;

        const { clientId, fileName, folderName } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiExclusionsScan = api.apiGetConfiguration(pathFromURL);

        try{
            const allPolicies = await apiExclusionsScan.get();

            createFileForBackup(allPolicies.data, fileName, folderName);
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'exclusions scan'
                }
            );
        }
        catch(error){
            console.error('Error to create backups for exclusions scan', error.message);
  
            res.status(500).json({ success: false, message: 'Error to create backups for exclusions scan' });
        };
    }
);

router.get(
    '/exclusions/download',
    [
        query('clientId').isLength({ min: 35 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('fileName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
        query('folderName').isLength({ min: 3 }).withMessage('Query parameters cannot be empty').trim().escape(),
       
        query().custom((value, { req }) => {
            if (req.query.clientId.trim() === '' || req.query.fileName.trim() === '' || req.query.folderName.trim() === '') {
                throw new Error('Query parameters cannot be empty');
            }
            return true;
        })
    ],
    async (req, res) => {

        pathFromURL = `endpoint/v1/downloads`;

        const { clientId, fileName, folderName } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiExclusionsDownload = api.apiGetConfiguration(pathFromURL);

        try{
            const allPolicies = await apiExclusionsDownload.get();

            createFileForBackup(allPolicies.data, fileName, folderName);
            
            res.json(
                { 
                    'status': 201,
                    'fileName': 'exclusions download'
                }
            );
        }
        catch(error){
            console.error('Error to get data for exclusions download:', error.message);
  
            res.status(500).json({ success: false, message: 'Error to get data for exclusions download' });
        };
    }
);

router.get(
    '/reset',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        pathFromURL = `/endpoint/v1/policies`;

        const { clientId } = req.query;
        
        const apiResetEnviroment = getApiConfigurationInstance(clientId);

        try{
            await callResetBasePolicies(apiResetEnviroment, pathFromURL);
            await setPolicyForWebControl(apiResetEnviroment);

            res.json(
                { 
                    'status': 200
                }
            );
        }
        catch(error){
            console.error('Error to reset to base policies', error.message);
  
            res.status(500).json({ success: false, message: 'Error to reset to base policies' });
        };
    }
);

export default router;