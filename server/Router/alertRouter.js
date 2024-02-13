import { express } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import { pageSolution } from '.././help/pageSolution.js';

const router = express.Router();
const api = getApiConfigurationInstance();

const pathFromURL = `common/v1/alerts`; 

const addParams = {
    "pageSize": 10
};

router.get(
    '/',
    async (req, res) => {
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