import ApiBackup from '../axiosrequests/apiBackup.js';

const apiRequestBackup = new ApiBackup();

function findByArchiveButton(value) {
    switch (value){
        case 'items':
            createBackupItems();
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

async function createBackupPolicies(){
    const backUpPoliciesCheck = await apiRequestBackup.backupPolicies();

    console.log(backUpPoliciesCheck);
};

export { findByArchiveButton };