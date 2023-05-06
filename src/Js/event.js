import { setGlobal, apiHost, pagesTable, id } from './global.js';
import { eventRouter } from '../Global/globalInport.js';

// ----------------------WebSite.js-----------------------------------
import { allowWebSite } from './webSite.js';
// -------------------------------------------------------------------

// const regex = /https?:\/\/(?<website>(?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;
// const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)\/?([\w\d-]+\/?[\w\d-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+)' ([\w+ ]*['\w' ()]*)/;

const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;

let setAllowSite = new Set(); 

let events = 
{
    has_more: Boolean,
    items: {},
    next_cursor: ''
};

async function callEvents(){
    setAllowSite = await allowWebSite();
    return await getEvents();
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
    events.items = events.items.filter(x => !setAllowSite.has(x.name.match(regexWebsite)[1]));

    // events.items = events.items.filter(x => x.name.match(regexWebsite)[1] && x.name.match(regexWebsite)[3]);
    events.next_cursor = eventData.next_cursor;

    pagesTable();
    return events;
};
//)


export { callEvents };