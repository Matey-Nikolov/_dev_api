import { setGlobal, setGlobalPOST, apiHost, pagesTable } from './global.js';

// const regex = /https?:\/\/(?<website>(?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;
const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;


let getWebsite = '';
let matchWebSite = '';

let setAllowSite = new Set(); 
let setBlockSite = new Set();

let events = 
{
    has_more: Boolean,
    items: {},
    next_cursor: ''
};

async function callEvents(){
    await allowWebSite();
    return await getEvents();
};

async function allowWebSite(){
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites?pageTotal=true`);
 
    const allowWebSiteData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    allowWebSiteData.items.map((value) => {
        setAllowSite.add(value.url);
    });

    // console.log(setAllowSite);
};

//(
async function getEvents(){


    const url = new URL(`${apiHost}/siem/v1/events`);

    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 

    const eventData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    //Web filter - still in progress
    events.has_more = eventData.has_more;
    events.items = eventData.items.filter(x => x.type.match(filterRegex)[2] === 'WebControlViolation');
    events.items = eventData.items.filter(x => !setAllowSite.has(x.name.match(regexWebsite)[1]));
    events.next_cursor = eventData.next_cursor;

    // console.log(events);

    pagesTable();

    return events;
};
//)

const btnAllowWebsite = async (event) =>{
    event.preventDefault();

    console.log(event);
};

export { callEvents, btnAllowWebsite };