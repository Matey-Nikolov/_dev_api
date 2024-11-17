import { api } from "../apiConfig";

const loginInApp = async (encryptedData) => {
    let responseResult = null;

    try {

        console.log(encryptedData);
        

        const response = await api.post('/loginInApp', { encryptedData });

        console.log(response);
        

        responseResult = response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }

    console.log(responseResult);

    return responseResult;
};

export default loginInApp;