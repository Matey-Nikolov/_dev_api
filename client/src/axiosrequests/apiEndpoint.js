import { api } from "./apiConfig";
import { encryptData, decryptData } from '../Services/cryptoService';

const getEndpoints = async (clientId) => {
    let endpoints = {};
    const { encryptedData, iv } = encryptData({ clientId });

    await api.get('/endpoint', {
        params: {
            encryptedData,
            iv
        }
    })
    .then((response) => {
        const { encryptedData, iv } = response.data;
        endpoints = decryptData(encryptedData, iv);
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return endpoints;
};

const getEndpointDetails = async (machine_Id, clientId) => {
    let endpointDetails = {};
    const { encryptedData, iv } = encryptData({ machine_Id, clientId });

    await api.get('/endpoint/details', {
        params: {
            encryptedData,
            iv
        },
    })
    .then((response) => {
        const { encryptedData, iv } = response.data;
        endpointDetails = decryptData(encryptedData, iv);
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return endpointDetails;
};

const endpointScanRequest = async (machine_Id, clientId) => {
    const { encryptedData, iv } = encryptData({ machine_Id, clientId });

    try {
        const response = await api.get('/endpoint/scan', {
            params: {
                encryptedData,
                iv
            }
        });

        const { encryptedData: responseData, iv: responseIv } = response.data;
        const decryptedResponse = decryptData(responseData, responseIv);

        return decryptedResponse.status;
    } catch (error) {
        console.error('Error:', error.response ? error.response.status : error.message);

        return error.response ? error.response.status : 500;
    }
};

const endpointUpdateRequest = async (machine_Id, clientId) => {
    const { encryptedData, iv } = encryptData({ machine_Id, clientId });

    try {
        const response = await api.get('/endpoint/update', {
            params: {
                encryptedData,
                iv
            }
        });

        const { encryptedData: responseData, iv: responseIv } = response.data;
        const decryptedResponse = decryptData(responseData, responseIv);

        return decryptedResponse.status;
    } catch (error) {
        console.error('Error:', error.response ? error.response.status : error.message);

        return error.response ? error.response.status : 500;
    }
};

const endpointSoftware = async (clientId) => {
    const { encryptedData, iv } = encryptData({ clientId });

    try {
        const response = await api.get('/endpoint/software', {
            params: {
                encryptedData,
                iv
            }
        });

        const { encryptedData: responseData, iv: responseIv } = response.data;
        const decryptedResponse = decryptData(responseData, responseIv);

        return decryptedResponse;
    } catch (error) {
        console.error('Error:', error.response ? error.response.status : error.message);

        return error.response ? error.response.status : 500;
    }
};

export { getEndpoints, getEndpointDetails, endpointScanRequest, endpointUpdateRequest, endpointSoftware };