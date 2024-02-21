import { api } from "./apiConfig";

export const getEvents = async (clientId) => {
    let events = {};

    await api.get('/events', {
        params: {
            clientId
        }
    })
    .then((response) => {
        events =  response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return events;
};