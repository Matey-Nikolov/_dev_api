import { api } from "./apiConfig";

class ApiBackup {
    constructor() {
        this.isCreateFileWithData = {};
    };

    async backupByItems() {
        try {
            const response = await api.get('/archive/items');

            this.isCreateFileWithData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    // async backupBlockItems(){

    // };

    async backupPolicies(){
        try {
            const response = await api.get('/archive/policies');

            this.isCreateFileWithData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };
};

export default ApiBackup;