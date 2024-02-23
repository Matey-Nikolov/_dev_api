import { express, query, validationResult } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const router = express.Router();
const api = getApiConfigurationInstance('owner');

let pathFromURL = ``;

router.get(
    '/',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        pathFromURL = `/endpoint/v1/settings/web-control/local-sites?pageTotal=true`;

        const { clientId } = req.query;

        const api = getApiConfigurationInstance(clientId);
        const apiAllWebsites = api.apiGetConfiguration(pathFromURL);

        try{
            const allWebsites = await apiAllWebsites.get();
            
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
        query('website_Id').isLength({ min: 20 }).trim().escape(),
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { website_Id, clientId } = req.query;

        const api = getApiConfigurationInstance(clientId);

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
        query('url').isLength({ min: 3 }).trim().escape(),
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { url, clientId } = req.query;


        const api = getApiConfigurationInstance(clientId);

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