import { api } from "./apiConfig";
import { decryptData, encryptData } from "../Services/cryptoService";

const getAlerts = async (clientId) => {
    let alerts = {
        'items': {}
    };

    const encryptedData = encryptData({ clientId });

    await api.get('/alert', {
        params: {
            encryptedData: encryptedData.encryptedData,
            iv: encryptedData.iv
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

    const encryptedData = encryptData({ clientId, alertId, action });

    await api.get('/alert/actions', {
        params: {
            encryptedData: encryptedData.encryptedData,
            iv: encryptedData.iv
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