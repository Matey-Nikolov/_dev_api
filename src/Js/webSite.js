import { eventAllRouter, websitesRouter } from '../controller/router.js';
import { setGlobal, apiHost, id, pagesTable } from './global.js';

const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)\/?([\w\d-]+\/?[\w\d-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+)' ([\w+ ]*['\w' ()]*)/;

let setwebsite = new Set(); 
let getWebsiteData = {};

async function getWebsite(){
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites?pageTotal=true`);

    const getData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    return getData;
};

async function allowWebSite(type){
    getWebsiteData = await getWebsite();

    setwebsite.clear();

    switch(type){
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
                    url: value.url   
                };
        
                setwebsite.add(data);
            });
        
        break
    }

    return setwebsite;
};

function setDelete(){
    const myHeaders = new Headers();
    myHeaders.append('X-Tenant-ID', id);
    // myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return requestOptions;
}

function setAllowPOST(valueURL){
    const myHeaders = new Headers();
    myHeaders.append('X-Tenant-ID', id);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    
    const addLocalSite = 
    {
        tags: [
            "ALLOW"
        ],
        url: valueURL,
        comment: "Added by Matey"
    };

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(addLocalSite)
    };
  
    return requestOptions;
};

const handleButtonClickBlock = (event) => {
    if (event.target.classList.contains('btn-outline-danger')) {
        const type = event.target.dataset.type;

        // console.log(type);
        btnBlockWebsite(type);
    }
};

const handleButtonClickAllow = (event) => {
    if (event.target.classList.contains('btn-outline-success')) {
        const type = event.target.dataset.type;
        btnAllowWebsite(type);
    }
};

const addAlloWebsite = async (valueURL) =>{
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites`);
    // valueURL = valueURL.match(regexWebsite)[1];
    await fetch(url, setAllowPOST(valueURL));
};

const btnBlockWebsite = async (id) =>{
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites/${id}`);
    await fetch(url, setDelete());
    websitesRouter();
};
  
const btnAllowWebsite = async (valueURL) =>{
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites`);
    valueURL = valueURL.match(regexWebsite)[1];

    await fetch(url, setAllowPOST(valueURL));

    eventAllRouter();
};

export { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, setAllowPOST, addAlloWebsite };