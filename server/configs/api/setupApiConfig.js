import axios from "axios";

class ApiConfiguration {
    constructor(accessToken, access_Id) {
        this.accessToken = accessToken;
        this.access_Id = access_Id;
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

    patchApiConfiguration(addURL, addData){
        const axiosConfig = {
            method: 'patch',
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
}

let instances = new Map();

export default function getApiConfigurationInstance(uniqueId, access_Id, accessToken) {
    const key = uniqueId;

    if (!instances.has(key)) {
        instances.set(key, new ApiConfiguration(accessToken, access_Id));
    } else if (accessToken && access_Id) {
        let instance = instances.get(key);
        instance.accessToken = accessToken;
        instance.access_Id = access_Id;
    };
    
    return instances.get(key);
};