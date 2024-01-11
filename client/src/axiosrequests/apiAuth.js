import { api } from "./apiConfig";

export const whoIAm = async (accessToken) => {
    let id;
    await api.get('/access', {
        params: {
            accessToken,
        },
    })
    .then((response) => {
        id =  response.data.responseData.id;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    return id;
};