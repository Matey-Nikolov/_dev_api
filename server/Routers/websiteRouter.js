import { express, query, validationResult } from '../globalImports.js';
import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';
import encryptData from '../help/encrypt.js';
import decryptData from '../help/decryptData.js';

const router = express.Router();

let pathFromURL = ``;

router.get(
    '/',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { encryptedData, iv } = req.query;
        const { clientId } = decryptData(encryptedData, iv);

        pathFromURL = `/endpoint/v1/settings/web-control/local-sites?pageTotal=true`;

        const api = getApiConfigurationInstance(clientId);
        const apiAllWebsites = api.apiGetConfiguration(pathFromURL);

        try {
            const allWebsites = await apiAllWebsites.get();
            
            const encryptedResponse = encryptData(allWebsites.data);

            res.json(encryptedResponse);
        } catch (error) {
            console.error('Error get information for websites:', error.message);
            res.status(404).json({ success: false, message: 'Error get information for websites' });
        };
    }
);

router.get(
    '/delete',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { encryptedData, iv } = req.query;
        const { website_Id, clientId } = decryptData(encryptedData, iv);

        const api = getApiConfigurationInstance(clientId);

        pathFromURL = `/endpoint/v1/settings/web-control/local-sites/${website_Id}`;

        api.apiDeleteConfiguration(pathFromURL, JSON.stringify({}))
            .then((isDeleted) => {
                const encryptedResponse = encryptData(isDeleted.data.deleted);

                res.json(encryptedResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

router.get(
    '/add',
    [
        query('encryptedData').isString(),
        query('iv').isString()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { encryptedData, iv } = req.query;
        const { url, clientId } = decryptData(encryptedData, iv);

        const api = getApiConfigurationInstance(clientId);

        pathFromURL = `/endpoint/v1/settings/web-control/local-sites`;

        const addData = 
            JSON.stringify({
            "tags": ["ALLOW"],
            "url": url,
            "comment": "Add by Matey - soon custom comments."
        });

        await api.postApiConfiguration(pathFromURL, addData)
        .then((response) => {

            const encryptedResponse = encryptData({
                'status': response.status,
                'information': response.data,
            });

            res.json(encryptedResponse);
        })
        .catch((error) => {
            console.log(error);
        });
    }
);

export default router;