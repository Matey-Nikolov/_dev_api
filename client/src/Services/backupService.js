import ApiBackup from '../axiosrequests/apiBackup.js';

const apiRequestBackup = new ApiBackup();
let statusCodeAndName = {};

export default async function findByBackupButton(value) {
    switch (value){
        case 'items':
            statusCodeAndName = await createBackupItems();
        break;
        case 'block items':
            statusCodeAndName = await createBackupBlockItems();
        break;
        case 'policies':
            statusCodeAndName = await createBackupPolicies();
        break;
    };
    
    return statusCodeAndName;
};


async function createBackupItems(){
    const backUpItemsCheck = await apiRequestBackup.backupByItems();

    return backUpItemsCheck;
};

async function createBackupBlockItems(){
    const backUpBlockItemsCheck = await apiRequestBackup.backupBlockItems();

    return backUpBlockItemsCheck;
};

async function createBackupPolicies(){
    const backUpPoliciesCheck = await apiRequestBackup.backupPolicies();

    return backUpPoliciesCheck;
};