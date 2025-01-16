import { api } from "./apiConfig";
import { encryptData, decryptData } from "../Services/cryptoService";

class ApiWebsite {
    constructor(valueId) {
        this.clientId = valueId;
        this.website = {};
        
        this.isDeleted = false;

        this.isAddWebsite = {
            'status': -1,
            'information': { }
        };
    };

    async getWebsite() {
        try {
            const encryptedData = encryptData({ clientId: this.clientId });

            const response = await api.get('/website', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });
            
            this.website = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.website;
    };

    async deleteRequest(website_Id) {
        try {
            const encryptedData = encryptData({ website_Id, clientId: this.clientId });

            const response = await api.get('/website/delete', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isDeleted = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        return this.isDeleted;
    };

    async addWebsiteRequest(url) {
        try {
            const encryptedData = encryptData({ url, clientId: this.clientId });

            const response = await api.get('/website/add', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isAddWebsite = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isAddWebsite;
    };
};

export default ApiWebsite;