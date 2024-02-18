import { express, axios } from '../globalImports.js';

import { query, validationResult } from 'express-validator';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const router = express.Router();
const api = getApiConfigurationInstance('owner');

let pathFromURL = ``;

router.get(
    '/',
    async (req, res) => {
        pathFromURL = `/endpoint/v1/settings/web-control/local-sites?pageTotal=true`;

        const apiallWebsites = api.apiGetConfiguration(pathFromURL);

        try{
            const allWebsites = await apiallWebsites.get();
            
            res.json(allWebsites.data);
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
        query('website_Id').isLength({ min: 6 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { website_Id } = req.query;

        pathFromURL = `endpoint/v1/settings/web-control/local-sites/${website_Id}`;

        api.apiDeleteConfiguration(pathFromURL, JSON.stringify({}))
            .then((isDeleted) => {
                res.json(isDeleted.data.deleted);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/add',
    [
        query('url').isLength({ min: 1 }).trim().escape(),
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { url } = req.query;

        pathFromURL = `endpoint/v1/settings/web-control/local-sites`;

        const addData = 
            JSON.stringify({

                "categoryId": 50,
                "url": url,
                "comment": "Add by Matey - soon custom comments."
        });

        await api.postApiConfiguration(pathFromURL, addData)
        .then((response) => {
            res.json({ 
                'status': response.status,
                'information': response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
);

export default router;