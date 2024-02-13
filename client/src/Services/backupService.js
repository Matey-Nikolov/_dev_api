import ApiBackup from '../axiosrequests/apiBackup.js';

const apiRequestBackup = new ApiBackup();

export default function findByBackupButton(value) {
    switch (value){
        case 'items':
            createBackupItems();
        break;
        case 'block items':
            createBackupBlockItems();
        break;
        case 'policies':
            createBackupPolicies();
        break;
    };
};


async function createBackupItems(){
    const backUpItemsCheck = await apiRequestBackup.backupByItems();

    console.log(backUpItemsCheck);
};

async function createBackupBlockItems(){
    const backUpBlockItemsCheck = await apiRequestBackup.backupBlockItems();

    console.log(backUpBlockItemsCheck);
};

async function createBackupPolicies(){
    const backUpPoliciesCheck = await apiRequestBackup.backupPolicies();

    console.log(backUpPoliciesCheck);
};