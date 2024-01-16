import { api } from "./apiConfig";

export const getEvents = async (accessToken, access_Id) => {
    let events = {};

    await api.get('/events', {
        params: {
            accessToken,
            access_Id
        },
    })
    .then((response) => {
        events =  response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return events;
};