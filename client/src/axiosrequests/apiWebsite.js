import { api } from "./apiConfig";

class ApiWebsite {
    constructor() {
        this.website = {};

        this.paramsWebsite ={
            'accessToken': '',
            'access_Id': '',
        };

        this.isDeleted = false;

        this.isAddWebsite = {
            'status': -1,
            'information': { }
        };
    };

    async getWebsite() {
        try {
            const response = await api.get('/website');
            
            this.website = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.website;
    };

    async deleteRequest(website_Id){
        try {
            this.isDeleted = await api.get('/website/delete', {
                params: {
                    website_Id
                }
            });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        return this.isDeleted;
    };

    async addWebsiteRequest(url){
        try {
            this.isAddWebsite = await api.get('/website/add', {
                params: {
                    url
                }
            });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isAddWebsite;
    };
};

export default ApiWebsite;