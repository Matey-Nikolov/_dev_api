import { api } from "./apiConfig";

export const getAlerts = async (accessToken, id) => {
    let alerts = {
        'items': {}
    };

    await api.get('/alert', {
        params: {
            accessToken,
            id
        }
    })
    .then((response) => {
        alerts.items = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    console.log(alerts);

    return alerts;
};