import axios from "axios";

const baseURL = 'http://localhost:3000'; //process.env.REACT_APP_BASE_URL
const regex = /(?:https?:\/\/www\.)?(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

export const setupInformation = async (accessToken, access_Id, uniqueId, urlDataRegion) => {
    const extractedURL = (regex.exec(urlDataRegion) || [])[1];

    let isOkStatus = { };

    const api = axios.create({
        baseURL,
        params: {
            accessToken, 
            access_Id,
            uniqueId,
            extractedURL
        }
    });

    await api.get('/configuration')
    .then((response) => {
        isOkStatus = response;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
};
