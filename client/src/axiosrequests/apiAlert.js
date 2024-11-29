import { api } from "./apiConfig";
import { decryptData } from "../Services/cryptoService";

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
        alerts.items = decryptData(response.data.alerts, response.data.iv);
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
    
    return alerts;
};

const takeActionAlert = async (clientId, alertId, action) => {
    let successAndAlerts = {};

    await api.get('/alert/actions', {
        params: {
            clientId,
            alertId,
            action
        }
    })
    .then((response) => {
        successAndAlerts = response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return successAndAlerts;
};

export { getAlerts, takeActionAlert };