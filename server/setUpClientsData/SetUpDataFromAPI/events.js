import getApiConfigurationInstance from '../../configs/api/setupApiConfig.js';

const pathFromURL = `/siem/v1/events`; 

const getEventsFromAPI = async (clientId) => {
    const api = getApiConfigurationInstance(clientId);

    const apiEvents = api.apiGetConfiguration(pathFromURL);

    const allEvents = await apiEvents.get();

    return response.data.items;
};

export default getEventsFromAPI;