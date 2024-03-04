import { api } from "./apiConfig";

const getAlerts = async (clientId) => {
    let alerts = {
        'items': {}
    };

    await api.get('/alert', {
        params: {
            clientId
        }
    })
    .then((response) => {
        alerts.items = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return alerts;
};

const takeActionAlert = async (clientId, alertId, action) => {
    let success = {};

    await api.get('/alert/actions', {
        params: {
            clientId,
            alertId,
            action
        }
    })
    .then((response) => {
        success = response.data.status
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return success;
};

export { getAlerts, takeActionAlert };