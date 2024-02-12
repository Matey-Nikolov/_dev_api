import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

import { pageSolution } from '.././help/pageSolution.js';

const router = express.Router();

router.get(
    '/scan',
    [
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape(),
        query('machine_Id').isLength({ min: 1 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id, machine_Id } = req.query;

        const axiosConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api-eu01.central.sophos.com/endpoint/v1/endpoints/${machine_Id}/scans`,
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({})
        };

        await axios.request(axiosConfig)
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
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape(),
        query('machine_Id').isLength({ min: 1 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id, machine_Id } = req.query;

        const axiosConfig = {
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`
            }
        };

        try{
            // https://api-eu01.central.sophos.com
            const response = await axios.get(`https://api-eu01.central.sophos.com/endpoint/v1/endpoints/${machine_Id}`, axiosConfig);
        
            res.json(response.data);
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
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id } = req.query;

        const axiosConfig = {
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`
            }
        };

        let params = {
            "pageSize": 2,
           // "product": "firewall",
           // "category": "connectivity"
        };

        try{
            // https://api-eu01.central.sophos.com
            const url = `https://api-eu01.central.sophos.com/endpoint/v1/endpoints`; 


           // const response = await axios.get(url, axiosConfig);

            const response = await pageSolution(url, params, axiosConfig);

            res.json(response);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            // Handle errors as needed
            res.status(500).json({ success: false, message: 'Error getting data to external URL' });
        };
    }
);

export default router;