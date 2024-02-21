import { express, query } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import { pageSolution } from '.././help/pageSolution.js';

const router = express.Router();

const pathFromURL = `common/v1/alerts`; 

const addParams = {
    "pageSize": 10
};

router.get(
    '/',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        const { clientId } = req.query;

        const api = getApiConfigurationInstance(clientId);

        const apiAlert = api.apiGetConfiguration(pathFromURL, addParams);

        try{       
            const allAlerts = await pageSolution(apiAlert);

            res.json(allAlerts);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

export default router;