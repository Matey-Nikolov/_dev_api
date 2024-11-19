import { api } from "../apiConfig";

const loginInApp = async (encryptedPayload) => {
    let responseResult = {};

    try {
        const response = await api.post('/loginInApp', encryptedPayload);

        responseResult = response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    };

    return responseResult;
};

export default loginInApp;