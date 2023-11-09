import { eventAllRouter, websitesRouter } from '../controller/router.js';
import { getWebsiteAllow } from './global.js';

const regexWebsite = /(?:https?\/\/www\.)*(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

let setwebsite = new Set(); 
let getWebsiteData = {};

async function getWebsite(){
    const getData = await fetch('/data/websites')
    .then(response => response.json())
    .catch(error => console.log('error', error));

    return getData;
};

async function allowWebSite(typeName){
    getWebsiteData = await getWebsite();

    setwebsite.clear();

    switch(typeName){
        case 'allow':
            getWebsiteData.items.map((value) => {
                setwebsite.add(value.url);
            });
        break
        default:
            getWebsiteData.items.map((value) => {

                let data = 
                { 
                    id: value.id,
                    url: value.url,
                    comment: value.comment   
                };
        
                setwebsite.add(data);
            });
        
        break
    }

    return setwebsite;
};

const handleButtonClickBlock = (event) => {
    if (event.target.classList.contains('btn-outline-danger')) {
        const type = event.target.dataset.type;

        btnBlockWebsite(type);
    }
};

const handleButtonClickAllow = (event) => {
    if (event.target.classList.contains('btn-outline-success')) {
        const type = event.target.dataset.type;
        btnAllowWebsite(type);
    }
};

// This is a Post request
const addAlloWebsite = async (valueURL) =>{
    setwebsite = await allowWebSite('allow');

    let match = regexWebsite.exec(valueURL);
    let urlExtract = match ? match[1] : null;

    getWebsiteAllow(urlExtract);

    if (setwebsite.has(urlExtract)){
        return true;
    }else if (urlExtract !== null){
        await fetch('/data/websites/post');
        return false;
    }

    return null;
};

const btnBlockWebsite = async (id) =>{
    await fetch(`/data/websites/delete/:${id}`, {
        method: 'DELETE',
    });
    
    websitesRouter();
};

// This is from filter events to add allow
const btnAllowWebsite = async (valueURL) =>{
    valueURL = (regexWebsite.exec(valueURL) || [])[1];
    getWebsiteAllow(valueURL);

    await fetch('/websites/post');

    eventAllRouter();
};

export { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, addAlloWebsite };