// ----------------------WebSite.js-----------------------------------
import { allowWebSite } from './webSite.js';
// -------------------------------------------------------------------

// const regex = /https?:\/\/(?<website>(?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;
// const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)\/?([\w\d-]+\/?[\w\d-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+\/?[\w\d_-]+)' ([\w+ ]*['\w' ()]*)/;

const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;

let setAllowSite = new Set(); 

let DataEvents = 
{
    has_more: Boolean,
    items: {},
    next_cursor: ''
};

async function callAllEvents(){
    return await getEvents();
};

async function callFilterWebsiteEvents(){
    setAllowSite = await allowWebSite('allow');
    return websiteFilterEvents();
};

async function getEvents(){
    const getDataForEvents = await fetch('/data/events')
    .then(response => response.json())
    .catch(error => console.log('error', error));

    DataEvents.has_more = getDataForEvents.has_more;
    DataEvents.items = getDataForEvents.items;
    DataEvents.next_cursor = getDataForEvents.next_cursor;
    
    return DataEvents;
}

let filteredEvents = 
{
    has_more: Boolean,
    items: {},
    next_cursor: ''
};

function websiteFilterEvents(){
    //Web filter - still in progress - soon v2.0
    filteredEvents.has_more = DataEvents.has_more;
    filteredEvents.items = DataEvents.items.filter(x => x.type.match(filterRegex)[2] === 'WebControlViolation');



    filteredEvents.items = filteredEvents.items.filter(x => !setAllowSite.has(x.name.match(regexWebsite)[1]));

    // events.items = events.items.filter(x => x.name.match(regexWebsite)[1] && x.name.match(regexWebsite)[3]);
    filteredEvents.next_cursor = DataEvents.next_cursor;

    return filteredEvents;
};

export { callAllEvents, callFilterWebsiteEvents };