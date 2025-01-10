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

        pathFromURL = `/endpoint/v1/downloads`; 

        const apiSoftware = api.apiGetConfiguration(pathFromURL);

        try{
            const software = await apiSoftware.get();

            res.json(software.data);
        }
        catch(error){
            console.error('Error get software:', error.message);

            res.status(400).json({ success: false, message: 'Error get software.' });
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


        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}/update-checks`; 

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


        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}/scans`; 

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

        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}?view=full`;

        let api = getApiConfigurationInstance(clientId);

        const apiDetailsEndpoint = api.apiGetConfiguration(pathFromURL);

        try{
            const details = await apiDetailsEndpoint.get();
        
            res.json(details.data);
        }
        catch(error){
            console.error('Error get details for current endpoint:', error.message);
  
            res.status(500).json({ success: false, message: 'Error get details for current endpoint:' });
        };
    }
);

// future implementation for getting all endpoints updated

// router.get(
//     '/',
//     [
//         query('clientId').isLength({ min: 35 }).trim().escape()
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         };

//         const { clientId } = req.query;
        
//         let api = getApiConfigurationInstance(clientId);

//         pathFromURL = `/endpoint/v1/endpoints?sort=lastSeenAt:desc&view=full`;

//         const addParams = {
//             "pageSize": 4
//         };

//         const apiAllEndpoints = api.apiGetConfiguration(pathFromURL, addParams);

//         try{
//             const endpoints = await pageSolution(apiAllEndpoints);

//             res.json(endpoints);
//         }
//         catch(error){
//             console.error('Error get data from enpoint:', error.message);

//             res.status(400).json({ success: false, message: 'Error get data for endpoints.' });
//         };
//     }
// );

export default router;