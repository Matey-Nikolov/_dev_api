import { api } from "./apiConfig";
import { encryptData, decryptData } from "../Services/cryptoService";

class ApiBackup {
    constructor(valueId, valueFolderName) {
        this.clientId = valueId;
        this.folderName = valueFolderName;

        this.isCreateFileWithData = {};
    };

    async backupItems(fileName) {
        try {
            const encryptedData = encryptData({ 
                clientId: this.clientId, 
                fileName, 
                folderName: this.folderName });

            const response = await api.get('/backup/items', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupBlockItems(fileName) {
        try {
            const encryptedData = encryptData({ 
                clientId: this.clientId, 
                fileName, 
                folderName: this.folderName 
            });

            const response = await api.get('/backup/items/blocks', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupPolicies(fileName) {
        try {
            const encryptedData = encryptData({ 
                clientId: this.clientId, 
                fileName, 
                folderName: this.folderName
            });

            const response = await api.get('/backup/policies', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupScanningExclusions(fileName) {
        try {
            const encryptedData = encryptData({ 
                clientId: this.clientId, 
                fileName, 
                folderName: this.folderName 
            });

            const response = await api.get('/backup/exclusions/scan', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async backupExclusionsDownload(fileName) {
        try {
            const encryptedData = encryptData({ 
                clientId: this.clientId, 
                fileName, 
                folderName: this.folderName 
            });

            const response = await api.get('/backup/exclusions/download', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };

    async resetEnviroment() {
        try {
            const encryptedData = encryptData({ clientId: this.clientId });

            const response = await api.get('/backup/reset', {
                params: {
                    encryptedData: encryptedData.encryptedData,
                    iv: encryptedData.iv
                }
            });

            this.isCreateFileWithData = decryptData(response.data.encryptedData, response.data.iv);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        };

        return this.isCreateFileWithData;
    };
};

export default ApiBackup;