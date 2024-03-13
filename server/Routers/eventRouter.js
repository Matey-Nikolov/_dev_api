import { express, query } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const getEvents = express.Router();

const pathFromURL = `/siem/v1/events`; 

getEvents.get(
    '/',
    [
        query('clientId').isLength({ min: 35 }).trim().escape()
    ],
    async (req, res) => {

        const { clientId } = req.query;
        
        const api = getApiConfigurationInstance(clientId);
        const apiEvents = api.apiGetConfiguration(pathFromURL);

        try{
            const allEvents = await apiEvents.get();
        
            res.json(allEvents.data);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error get data for events.' });
        };
    }
);

export default getEvents;