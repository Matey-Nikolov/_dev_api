import { express, axios } from '../globalImports.js';

import getApiConfigurationInstance from '../configs/api/setupApiConfig.js';

const getEvents = express.Router();
const api = getApiConfigurationInstance('owner');

const pathFromURL = `/siem/v1/events`; 

// const addParams = {
//     "pageSize": 10
// };

getEvents.get(
    '/',
    async (req, res) => {        
        const apiEvents = api.apiGetConfiguration(pathFromURL);

        try{
            const allEvents = await apiEvents.get();
        
            res.json(allEvents.data);
        }
        catch(error){
            console.error('Error posting data to external URL:', error.message);
  
            res.status(500).json({ success: false, message: 'Error posting data to external URL' });
        };
    }
);

export default getEvents;