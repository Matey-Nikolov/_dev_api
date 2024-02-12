import ApiArchive from '../axiosrequests/apiArchive.js';

const apiRequestArchive = new ApiArchive();

function findByArchiveButton(value) {
    switch (value){
        case 'items':
            archiveItems();
        break;
    };
};


async function archiveItems(){
    const backUpItemsCheck = await apiRequestArchive.archiveByItems();

    console.log(backUpItemsCheck);
};



export { findByArchiveButton };