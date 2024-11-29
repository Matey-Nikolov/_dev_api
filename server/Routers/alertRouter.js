import { express, query, validationResult } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
// import { pageSolution } from '.././help/pageSolution.js';

import { findClientById } from '../setUpClientsData/setupClientsRoute.js';
import encryptData from '../help/encrypt.js';

const router = express.Router();

let pathFromURL = `/common/v1/alerts`; 
let clientAlerts;

router.get(
    '/actions',
    [
        query('clientId').isLength({ min: 35 }).trim().escape(),
        query('alertId').isLength({ min: 35 }).trim().escape(),
        query('action').isLength({ min: 10 }).trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { clientId, alertId, action } = req.query;

        pathFromURL = `/common/v1/alerts/${alertId}/actions`;

        const api = getApiConfigurationInstance(clientId);
        clientAlerts = findClientById(clientId);

        const addData = 
            JSON.stringify({
            "action": action,
            "message": "Remove WinExeSvc"
        });

        await api.postApiConfiguration(pathFromURL, addData)
        .then((response) => {

            const alerts = clientAlerts.updateAlerts(alertId);

            res.json({ 
                'status': response.data.result,
                'alerts': alerts
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
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { clientId } = req.query;

        pathFromURL = `/common/v1/alerts`

        // const api = getApiConfigurationInstance(clientId);

        clientAlerts = findClientById(clientId);

        const encryptAlerts = encryptData(clientAlerts.alerts);

        // const apiAlert = api.apiGetConfiguration(pathFromURL, addParams);

        try{
            // const allAlerts = await pageSolution(apiAlert);

            res.json({ 
                'status': 200,
                'iv': encryptAlerts.iv,
                'alerts': encryptAlerts.encryptedData
            });
        }
        catch(error){
            console.error('Error getting information for alerts:', error.message);
  
            res.status(500).json({ success: false, message: 'Error getting information for alerts:' });
        };
    }
);

export default router;