import { setGlobal, apiHost, pagesTable } from './global.js';
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

async function getEvents(){


    const url = new URL(`${apiHost}/siem/v1/events`);

    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 

    const eventData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
    console.log(eventData);

    // const imageDescription = "'https://msedge.b.tlu.dl.delivery.mp.microsoft.com/filestreamingservice/files/7e7042ed-93ab-4b32-8d60-c109f34e8c13' blocked due to filetype 'Windows Executable (exe)'";
    // // const regexpSize = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
    // // const match = imageDescription.match(regexpSize);
    // // console.log(match[1]);

    events.has_more = eventData.has_more;
    events.items = eventData.items.filter(x => x.type.match(filterRegex)[2] === 'WebControlViolation');
    events.next_cursor = eventData.next_cursor;

    events.items.map((value) => {
        getWebsite = value.name;
        
        matchWebSite = getWebsite.match(regexWebsite);
        value.name = matchWebSite[1];
    });

    // console.log(events);

    render(tableEventTemplate(events), divApp);
    pagesTable();

    // return eventData;
};


export { getEvents };