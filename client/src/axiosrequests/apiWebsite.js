import { api } from "./apiConfig";

class ApiWebsite {
    constructor() {
        this.website = {};
        this.paramsWebsite ={
            'accessToken': '',
            'access_Id': '',
        };
        this.isDeleted = false;
    };

    // setCredentials(getAccessToken, getAccess_Id){
    //     console.log(getAccessToken);
    //     this.params.accessToken = getAccessToken;
    //     this.params.access_Id = getAccess_Id;
    // }

    async getWebsite(accessToken, access_Id) {
        try {
            // const response = await api.get('/website', {
            //     params: this.paramsWebsite
            // });

            
            const response = await api.get('/website', {
                params: {
                    accessToken,
                    access_Id
                },
            });
            
            this.website = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.website;
    };

    async deleteRequest(accessToken, access_Id, website_Id){
        try {
            this.isDeleted = await api.get('/website/delete', {
                params: {
                    accessToken,
                    access_Id,
                    website_Id
                },
            });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        return this.isDeleted;
    };
};

export default ApiWebsite;