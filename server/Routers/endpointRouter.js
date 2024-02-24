import { express, query, validationResult } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import { pageSolution } from '../help/pageSolution.js';

const router = express.Router();

let pathFromURL = ``;

router.get(
    '/software',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { clientId } = req.query;

        let api = getApiConfigurationInstance(clientId);

        pathFromURL = `endpoint/v1/downloads`; 

        const apiSoftware = api.apiGetConfiguration(pathFromURL);

        try{
            const software = await apiSoftware.get();

            res.json(software.data);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);

            res.status(500).json({ success: false, message: 'Error getting data to external URL' });
        };
    }
);

router.get(
    '/update',
    [
        query('machine_Id').isLength({ min: 35 }).trim().escape(),
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { machine_Id, clientId } = req.query;

        let api = getApiConfigurationInstance(clientId);


        pathFromURL = `endpoint/v1/endpoints/${machine_Id}/update-checks`; 

        await api.postApiConfiguration(pathFromURL, JSON.stringify({}))
            .then((response) => {
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/scan',
    [
        query('machine_Id').isLength({ min: 35 }).trim().escape(),
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { machine_Id, clientId } = req.query;

        let api = getApiConfigurationInstance(clientId);


        pathFromURL = `endpoint/v1/endpoints/${machine_Id}/scans`; 

        await api.postApiConfiguration(pathFromURL, JSON.stringify({}))
            .then((response) => {
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/details',
    [
        query('machine_Id').isLength({ min: 35 }).trim().escape(),
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { machine_Id, clientId } = req.query;

        pathFromURL = `endpoint/v1/endpoints/${machine_Id}?view=full`;

        let api = getApiConfigurationInstance(clientId);

        const apiDetailsEndpoint = api.apiGetConfiguration(pathFromURL);

        try{
            const details = await apiDetailsEndpoint.get();
        
            res.json(details.data);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

router.get(
    '/',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        const { clientId } = req.query;
        
        let api = getApiConfigurationInstance(clientId);

        pathFromURL = `endpoint/v1/endpoints?pageSize=2&view=full`;

        const addParams = {
            "pageSize": 2
        };

        const apiAllEndpoints = api.apiGetConfiguration(pathFromURL, addParams);

        try{
            const endpoints = await pageSolution(apiAllEndpoints);

            res.json(endpoints);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);

            res.status(500).json({ success: false, message: 'Error getting data to external URL' });
        };
    }
);

export default router;