import axios from 'axios';

let id;
let urlDataRegion;

const authorization = async (accessToken) =>{
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    
    const response = await axios.get(`https://api.central.sophos.com/whoami/v1`, axiosConfig);

    id = response.data.responseData.id;
    urlDataRegion = response.data.responseData.apiHosts.dataRegion;

    return { id, urlDataRegion };
};

export default authorization;