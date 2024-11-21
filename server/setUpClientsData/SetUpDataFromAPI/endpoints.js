import getApiConfigurationInstance from '../../configs/api/setupApiConfig.js';
import { pageSolution } from '../../help/pageSolution.js';

const pathFromURL = `/endpoint/v1/endpoints?sort=lastSeenAt:desc&view=full`;

const addParams = {
    "pageSize": 20
};

const getEndpointsFromAPI = async (clientId) => {
    let api = getApiConfigurationInstance(clientId);

    const apiAllEndpoints = api.apiGetConfiguration(pathFromURL, addParams);

    const endpoints = await pageSolution(apiAllEndpoints);

    return endpoints;
};

export default getEndpointsFromAPI;