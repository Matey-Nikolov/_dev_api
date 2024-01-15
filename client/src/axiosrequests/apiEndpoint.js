import { api } from "./apiConfig";

const getEndpoints = async (accessToken, access_Id) => {
    let endponts = {};

    await api.get('/endpoint', {
        params: {
            accessToken,
            access_Id
        },
    })
    .then((response) => {
        endponts = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    console.log(endponts);
    return endponts;
};

const getEndpointDetails = async (accessToken, access_Id, machine_Id) => {
    let endpontDetails = {};

    await api.get('/endpoint/details', {
        params: {
            accessToken,
            access_Id,
            machine_Id
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

const endpointScan = async (accessToken, access_Id, machine_Id) => {
    try {
        const response = await api.get('/endpoint/scan', {
            params: {
                accessToken,
                access_Id,
                machine_Id
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