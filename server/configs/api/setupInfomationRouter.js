import getApiConfigurationInstance from './setupApiConfig.js';

const setupInformation = async (accessToken, access_Id, uniqueId, extractedURL) => {
    const api = getApiConfigurationInstance(uniqueId, access_Id, accessToken, extractedURL);
};

export default  setupInformation;