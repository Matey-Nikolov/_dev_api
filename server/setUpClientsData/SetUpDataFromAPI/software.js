import getApiConfigurationInstance from '../../configs/api/setupApiConfig.js';

const pathFromURL = `/endpoint/v1/downloads`; 

const getSoftwareFromAPI = async (clientId) => {
    const api = getApiConfigurationInstance(clientId);

    const apiSoftware= api.apiGetConfiguration(pathFromURL);

    const allSoftware = await apiSoftware.get();

    return allSoftware.data;
};

export default getSoftwareFromAPI;