import { api } from "./apiConfig";

export const getAlerts = async () => {
    let alerts = {
        'items': {}
    };

    await api.get('/alert')
    .then((response) => {
        alerts.items = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return alerts;
};