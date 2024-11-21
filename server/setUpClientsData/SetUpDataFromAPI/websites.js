import getApiConfigurationInstance from '../../configs/api/setupApiConfig.js';

const pathFromURL = `/endpoint/v1/settings/web-control/local-sites?pageTotal=true`;

const getWebsitesFromAPI = async (clientId) => {
    let api = getApiConfigurationInstance(clientId);

    const apiAllWebsites = api.apiGetConfiguration(pathFromURL);

    const allWebsites = await apiAllWebsites.get();

    return allWebsites.data;
};

export default getWebsitesFromAPI;