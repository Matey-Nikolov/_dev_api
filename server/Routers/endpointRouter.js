import { express, query, validationResult } from '../globalImports.js';
import encryptData from '../help/encrypt.js';
import decryptData from '../help/decryptData.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import { pageSolution } from '../help/pageSolution.js';

const router = express.Router();

let pathFromURL = ``;

router.get(
    '/software',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { encryptedData, iv } = req.query;
        const { clientId } = decryptData(encryptedData, iv);

        let api = getApiConfigurationInstance(clientId);

        pathFromURL = `/endpoint/v1/downloads`;

        const apiSoftware = api.apiGetConfiguration(pathFromURL);

        try {
            const software = await apiSoftware.get();
            const encryptedResponse = encryptData(software.data);
            res.json(encryptedResponse);
        } catch (error) {
            console.error('Error get software:', error.message);
            res.status(400).json({ success: false, message: 'Error get software.' });
        }
    }
);

router.get(
    '/update',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { encryptedData, iv } = req.query;
        const { machine_Id, clientId } = decryptData(encryptedData, iv);

        let api = getApiConfigurationInstance(clientId);

        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}/update-checks`;

        await api.postApiConfiguration(pathFromURL, JSON.stringify({}))
            .then((response) => {
                const encryptedResponse = encryptData(response.data);
                res.json(encryptedResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/scan',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { encryptedData, iv } = req.query;
        const { machine_Id, clientId } = decryptData(encryptedData, iv);

        let api = getApiConfigurationInstance(clientId);

        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}/scans`;

        await api.postApiConfiguration(pathFromURL, JSON.stringify({}))
            .then((response) => {
                const encryptedResponse = encryptData(response.data);
                res.json(encryptedResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/details',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { encryptedData, iv } = req.query;
        const { machine_Id, clientId } = decryptData(encryptedData, iv);

        pathFromURL = `/endpoint/v1/endpoints/${machine_Id}?view=full`;

        let api = getApiConfigurationInstance(clientId);

        const apiDetailsEndpoint = api.apiGetConfiguration(pathFromURL);

        try {
            const details = await apiDetailsEndpoint.get();
            const encryptedResponse = encryptData(details.data);
            res.json(encryptedResponse);
        } catch (error) {
            console.error('Error get details for current endpoint:', error.message);
            res.status(500).json({ success: false, message: 'Error get details for current endpoint:' });
        }
    }
);

// future implementation for getting all endpoints updated
  
export default router;