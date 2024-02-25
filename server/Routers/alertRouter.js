import { express, query } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import { pageSolution } from '.././help/pageSolution.js';

const router = express.Router();

let pathFromURL = `common/v1/alerts`; 

const addParams = {
    "pageSize": 10
};

router.get(
    '/actions',
    [
        query('clientId').isLength({ min: 35 }).trim().escape(),
        query('alertId').isLength({ min: 35 }).trim().escape(),
        query('action').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        const { clientId, alertId, action } = req.query;

        pathFromURL = `/common/v1/alerts/${alertId}/actions`;

        const api = getApiConfigurationInstance(clientId);

        const addData = 
            JSON.stringify({
            "action": action,
            "message": "Remove WinExeSvc"
        });

        await api.postApiConfiguration(pathFromURL, addData)
        .then((response) => {
            res.json({ 
                'status': response.data.result
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
);

router.get(
    '/',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        const { clientId } = req.query;

        pathFromURL = `common/v1/alerts`

        const api = getApiConfigurationInstance(clientId);

        const apiAlert = api.apiGetConfiguration(pathFromURL, addParams);

        try{       
            const allAlerts = await pageSolution(apiAlert);

            res.json(allAlerts);
        }
        catch(error){
            console.error('Error getting information for alerts:', error.message);
  
            res.status(500).json({ success: false, message: 'Error getting information for alerts:' });
        };
    }
);

export default router;