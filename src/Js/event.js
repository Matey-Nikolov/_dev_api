import { setGlobal, setGlobalPOST, apiHost, pagesTable } from './global.js';
import { render, tableEventTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

// const regex = /https?:\/\/(?<website>(?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;
const regexWebsite = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;


let getWebsite = '';
let getType = '';
let matchWebSite = '';
let matcType = '';

let events = 
{
    has_more: Boolean,
    items: {},
    next_cursor: ''
};

function callEvents(){
    getEvents();
}

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
    events.next_cursor = eventData.next_cursor;

    events.items.map((value) => {
        getWebsite = value.name;
        
        matchWebSite = getWebsite.match(regexWebsite);
        value.name = matchWebSite[1] + ' - ' + 'block';
    });

    // console.log(events);

    render(tableEventTemplate(events), divApp);
    pagesTable();

    // return eventData;
};
//)

const btnAllowWebsite = async (event) =>{
    event.preventDefault();

    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites`);

    const allowPost = await fetch(url, setGlobalPOST());

    console.log(allowPost);
    console.log('ok');
};

export { callEvents, btnAllowWebsite };