import { express, query, validationResult } from '../globalImports.js';
import encryptData from '../help/encrypt.js';
import decryptData from '../help/decryptData.js';
import { findClientById } from '../setUpClientsData/setupClientsRoute.js';

const getEvents = express.Router();

getEvents.get(
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

        const clientEvents = findClientById(clientId);
        const encryptEvents = encryptData(clientEvents.events);

        try {
            res.json({ 
                'status': 200,
                'iv': encryptEvents.iv,
                'events': encryptEvents.encryptedData
            });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error get data for events.' });
        };
    }
);

export default getEvents;