import { api } from "./apiConfig";

export const getEvents = async () => {
    let events = {};

    await api.get('/events')
    .then((response) => {
        events =  response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return events;
};