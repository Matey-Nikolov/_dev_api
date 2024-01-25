import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

//import { pageSolution } from './pageSolution.js';

const router = express.Router();

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

        try{
            // https://api-eu01.central.sophos.com
            const response = await axios.get(`https://api-eu01.central.sophos.com/endpoint/v1/settings/web-control/local-sites?pageTotal=true`, axiosConfig);
            
            res.json(response.data);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

router.get(
    '/delete',
    [
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape(),
        query('website_Id').isLength({ min: 1 }).trim().escape(),
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id, website_Id } = req.query;

        const axiosConfig = {
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`
            }
        };

        try{
            // https://api-eu01.central.sophos.com
            const response = await axios.delete(`https://api-eu01.central.sophos.com/endpoint/v1/settings/web-control/local-sites/${website_Id}`, axiosConfig);
            
            res.json(response.data.deleted);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

router.get(
    '/add',
    [
        query('accessToken').isLength({ min: 1 }).trim().escape(),
        query('access_Id').isLength({ min: 1 }).trim().escape(),
        query('url').isLength({ min: 1 }).trim().escape(),
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { accessToken, access_Id, url } = req.query;

        const axiosConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api-eu01.central.sophos.com/endpoint/v1/settings/web-control/local-sites`,
            headers: {
              'X-Tenant-ID': access_Id,
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "categoryId": 50,
                "url": url,
                "comment": "Add by Matey - soon custom comments."
            })
        };

        await axios.request(axiosConfig)
        .then((response) => {
            res.json({ 
                'status': response.status,
                'information': response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });

        // try{
        //     // https://api-eu01.central.sophos.com
        //     const response = await axios
            
        //     res.json(response.data.deleted);
        // }
        // catch(error){
        //     console.error('Error posting data to external URL:', error.message);
  
        //     res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        // };
    }
);

export default router;