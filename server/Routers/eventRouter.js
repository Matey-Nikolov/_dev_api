import { express, query, validationResult } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const getEvents = express.Router();

const pathFromURL = `/siem/v1/events`; 

getEvents.get(
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

        const api = getApiConfigurationInstance(clientId);

        const apiEvents = api.apiGetConfiguration(pathFromURL);

        try{
            const allEvents = await apiEvents.get();
        
            res.json(allEvents.data);
        }
        catch(error){
            res.status(400).json({ success: false, message: 'Error get data for events.' });
        };
    }
);

export default getEvents;