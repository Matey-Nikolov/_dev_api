import { api } from "./apiConfig";
import { decryptData, encryptData } from "../Services/cryptoService";

export const getEvents = async (clientId) => {
    let events = {};

    const encryptedData = encryptData({ clientId });

    await api.get('/events', {
        params: {
            encryptedData: encryptedData.encryptedData,
            iv: encryptedData.iv
        }
    })
    .then((response) => {
        events = decryptData(response.data.events, response.data.iv);
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return events;
};