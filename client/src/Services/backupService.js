import ApiBackup from '../axiosrequests/apiBackup.js';

let statusCodeAndName = {};
let currentClient = '';

export default async function findByBackupButton(currentClient_id, valueButton, fileName, folderName) {
    currentClient = currentClient_id

    switch (valueButton){
        case 'allow items':
            statusCodeAndName = await createBackupItems(fileName, folderName);
        break;
        case 'block items':
            statusCodeAndName = await createBackupBlockItems(fileName, folderName);
        break;
        case 'policies':
            statusCodeAndName = await createBackupPolicies(fileName, folderName);
        break;
        case 'scanning exclusions':
            statusCodeAndName = await createBackupScanningExclusions(fileName, folderName);
        break;
        case 'exclusions download':
            statusCodeAndName = await createBackupExclusionsDownload(fileName, folderName);
        break;
        case 'reset':
            
        break;
    };
    
    return statusCodeAndName;
};

async function createBackupItems(fileName, folderName){
    const apiRequestBackup = new ApiBackup(currentClient, folderName);

    const backUpItemsCheck = await apiRequestBackup.backupByItems(fileName);

    return backUpItemsCheck;
};

async function createBackupBlockItems(fileName, folderName){
    const apiRequestBackup = new ApiBackup(currentClient, folderName);

    const backUpBlockItemsCheck = await apiRequestBackup.backupBlockItems(fileName);

    return backUpBlockItemsCheck;
};

async function createBackupPolicies(fileName, folderName){
    const apiRequestBackup = new ApiBackup(currentClient, folderName);

    const backUpPoliciesCheck = await apiRequestBackup.backupPolicies(fileName);

    return backUpPoliciesCheck;
};

async function createBackupScanningExclusions(fileName, folderName){
    const apiRequestBackup = new ApiBackup(currentClient, folderName);

    const backUpScanningExclusionsCheck = await apiRequestBackup.backupScanningExclusions(fileName);

    return backUpScanningExclusionsCheck;
};

async function createBackupExclusionsDownload(fileName, folderName){
    const apiRequestBackup = new ApiBackup(currentClient, folderName);

    const backUpExclusionsDownloadCheck = await apiRequestBackup.backupExclusionsDownload(fileName);

    return backUpExclusionsDownloadCheck;
};