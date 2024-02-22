import { api } from "./apiConfig";

class ApiBackup {
    constructor(valueId, valueFolderName) {
        this.clientId = valueId;
        this.folderName = valueFolderName;

        this.isCreateFileWithData = {};
    };

    async backupByItems(fileName) {
        try {
            const response = await api.get('/backup/items', {
                params: {
                    clientId:this.clientId,
                    fileName: fileName,
                    folderName:this.folderName
                }
            });

            this.isCreateFileWithData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupBlockItems(fileName){
        try {
            const response = await api.get('/backup/items/blocks', {
                params: {
                    clientId:this.clientId,
                    fileName: fileName,
                    folderName:this.folderName
                }
            });

            this.isCreateFileWithData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupPolicies(fileName){
        try {
            const response = await api.get('/backup/policies', {
                params: {
                    clientId:this.clientId,
                    fileName: fileName,
                    folderName:this.folderName
                }
            });

            this.isCreateFileWithData = response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    // async backupScanningExclusions(fileName){
    //     try {
    //         const response = await api.get('/backup/exclusions', {
    //             params: {
    //                 clientId:this.clientId,
    //                 fileName: fileName,
    //                 folderName:this.folderName
    //             }
    //         });

    //         this.isCreateFileWithData = response.data;
    //     } catch (error) {
    //         console.error('Error:', error.response ? error.response.data : error.message);
    //     };

    //     return this.isCreateFileWithData;
    // };
};

export default ApiBackup;