import { api } from "./apiConfig";

const getEndpoints = async (clientId) => {
    let endponts = {};

    await api.get('/endpoint', {
        params: {
            clientId
        }
    })
    .then((response) => {
        endponts = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return endponts;
};

const getEndpointDetails = async (machine_Id, clientId) => {
    let endpontDetails = {};

    await api.get('/endpoint/details', {
        params: {
            machine_Id,
            clientId
        },
    })
    .then((response) => {
        endpontDetails = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return endpontDetails;
};

const endpointScan = async (machine_Id, clientId) => {
    try {
        const response = await api.get('/endpoint/scan', {
            params: {
                machine_Id,
                clientId
            }
        });

        console.log(response);
        return response.status;
    } catch (error) {
        console.error('Error:', error.response ? error.response.status : error.message);

        return error.response ? error.response.status : 500;
    }
};

export { getEndpoints, getEndpointDetails, endpointScan };