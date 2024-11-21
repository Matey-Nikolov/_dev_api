import { api } from "./apiConfig";

let res = {};

const setupAPi = async () =>{
    await api.get('/setup')
    .then((response) => {
        res =  response.data;
    })
    .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    console.log(res);
    
};

export default setupAPi;