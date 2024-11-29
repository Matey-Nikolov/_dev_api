import { api } from "./apiConfig";
import { decryptData } from "../Services/cryptoService";

export const getEvents = async (clientId) => {
    let events = {};

    await api.get('/events', {
        params: {
            clientId
        }
    })
    .then((response) => {
        events =  decryptData(response.data.events, response.data.iv) ;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return events;
};