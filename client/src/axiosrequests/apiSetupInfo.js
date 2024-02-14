import axios from "axios";

const baseURL = 'http://localhost:3000'; //process.env.REACT_APP_BASE_URL

export const setupInformation = async (accessToken, access_Id) => {
    let isOkStatus = { };

    const api = axios.create({
        baseURL,
        params: {
            accessToken, 
            access_Id
        }
    });

    console.log(api);

    await api.get('/configuration')
    .then((response) => {
        isOkStatus = response;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    console.log(isOkStatus);
};