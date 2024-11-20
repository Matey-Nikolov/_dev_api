import getApiConfigurationInstance from '../../configs/api/setupApiConfig.js';
import { pageSolution } from '../../help/pageSolution.js';

let alerts = {
    'items': {}
};

let pathFromURL = `common/v1/alerts`; 

const addParams = {
    "pageSize": 25
};

const getAlersFromApi = async (clientId) => {
    pathFromURL = `common/v1/alerts`

    const api = getApiConfigurationInstance(clientId);

    const apiAlert = api.apiGetConfiguration(pathFromURL, addParams);

    const allAlerts = await pageSolution(apiAlert);
    // alerts.items = response.data

    return allAlerts;
};

export default getAlersFromApi;