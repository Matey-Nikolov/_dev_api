import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
    retries: 6,
    retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 3000),
    retryCondition(error) {

        switch (error.response.status) {
            case 429:
            case 500:
            case 501:
            case 502:
            case 503:
                return true;
            default:
                return false;
        };
    },
    onRetry: (retryCount) => {
        console.log(`retry count: `, retryCount);
    }
});


class ApiConfiguration {
    constructor(accessToken, access_Id, URL) {
        this.accessToken = accessToken;
        this.access_Id = access_Id;
        this.baseURL = `https://${URL}/`;
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

export default function getApiConfigurationInstance(uniqueId, access_Id, accessToken, URL) {
    const key = uniqueId;

    if (!instances.has(key)) {
        instances.set(key, new ApiConfiguration(accessToken, access_Id, URL));
    } else if (accessToken && access_Id) {
        let instance = instances.get(key);
        instance.accessToken = accessToken;
        instance.access_Id = access_Id;
    };
    
    return instances.get(key);
};