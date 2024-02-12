import { api } from "./apiConfig";

class ApiArchive {
    constructor() {
        this.archiveData = {};
    };

    async archiveByItems() {
        try {
            const response = await api.get('/archive/items');
            
            this.archiveData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.archiveData;
    };

    // async archiveByItems(){
    // };

    // async archiveByItems(){

    // };
};

export default ApiArchive;