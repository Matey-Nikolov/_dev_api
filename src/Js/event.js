import { setGlobal, apiHost, pagesTable } from './global.js';
import { render, tableEventTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

const regex = /https?:\/\/((?:[-\w.]|(?:%[\da-fA-F]{2}))+)/g;

let events = {
    'has_more': Boolean,
    'items': {},
    'next_cursor': ''
};

async function getEvents(){


    const url = new URL(`${apiHost}/siem/v1/events`);

    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 


  
    let eventData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    events.has_more = eventData.has_more;
    events.items = eventData.items.filter(x => x.name.match(regex));
    events.next_cursor = eventData.next_cursor;


    // eventData.items.map((value) => {
    //     if (myRe.exec(value.name)) {
    //         console.log('ojiuhuyctxrz');
    //         events.items = value.name;
    //     }
    // });

    console.log(events);

    render(tableEventTemplate(events), divApp);
    pagesTable();

    // return eventData;
}


export { getEvents };