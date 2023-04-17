import { setGlobal, apiHost, pagesTable } from './global.js';
import { render, tableEventTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

// const regex = /https?:\/\/(?<website>(?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;
const regex = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;

let websiteGet = '';

// let events = {
//     'has_more': Boolean,
//     'items': {},
//     'next_cursor': ''
// };

async function getEvents(){


    const url = new URL(`${apiHost}/siem/v1/events`);

    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 

    let eventData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    // events.has_more = eventData.has_more;
    // events.items = eventData.items.filter(x => x.name.match(regex));
    // events.next_cursor = eventData.next_cursor;
    
    console.log(eventData);

    // const imageDescription = "'https://msedge.b.tlu.dl.delivery.mp.microsoft.com/filestreamingservice/files/7e7042ed-93ab-4b32-8d60-c109f34e8c13' blocked due to filetype 'Windows Executable (exe)'";
    // // const regexpSize = /(?:https?:\/\/)*((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/;
    // // const match = imageDescription.match(regexpSize);
    // // console.log(match[1]);

    eventData.items.map((value) => {
        websiteGet = value.name;
        const match = websiteGet.match(regex);
        value.name = match[1];
    });


    render(tableEventTemplate(eventData), divApp);
    pagesTable();

    // return eventData;
}


export { getEvents };