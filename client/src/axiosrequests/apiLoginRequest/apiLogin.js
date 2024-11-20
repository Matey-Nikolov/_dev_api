import { api } from "../apiConfig";

let responseResult = {};

const loginInApp = async (encryptedPayload) => {
    responseResult = {};

    try {
        const response = await api.post('/loginInApp', encryptedPayload);
        responseResult = response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    };

    return responseResult;
};

const findUserInDatabase = async (encryptedEmail) => {
    responseResult = {};

    try {
        const response = await api.post('/loginInApp/findUser', encryptedEmail);
        responseResult = response.data.success;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    };

    return responseResult;
};

export { loginInApp, findUserInDatabase };