import axios from "axios";

class ApiConfiguration {
    constructor(setAccesToken, setAccess_Id) {
        this.accessToken = setAccesToken;
        this.access_Id = setAccess_Id;

        this.baseURL = 'https://api-eu01.central.sophos.com/';
    };

    apiGetConfiguration(addURL, addParams) {
        const api = axios.create({
            baseURL: `${this.baseURL}${addURL}`,
            headers: {
                'X-Tenant-ID': this.access_Id,
                'Authorization': `Bearer ${this.accessToken}`
            },
            params: addParams
        });
        
        return api;
    };

    postApiConfiguration(addURL, addData){
        const axiosConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.baseURL}${addURL}`,
            headers: {
                'X-Tenant-ID': this.access_Id,
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            data: addData
        };

        return axios(axiosConfig);
    };

    apiDeleteConfiguration(addURL, addData){
        const axiosConfig = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${this.baseURL}${addURL}`,
            headers: {
                'X-Tenant-ID': this.access_Id,
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            data: addData
        };

        return axios(axiosConfig);
    };
};

let instance = null;

export default function getApiConfigurationInstance(accessToken, access_Id) {
    if (!instance) {
        instance = new ApiConfiguration(accessToken, access_Id);
    } else if (accessToken && access_Id) {
        instance.accessToken = accessToken;
        instance.access_Id = access_Id;
    }
    return instance;
}