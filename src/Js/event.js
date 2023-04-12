import { setGlobal, apiHost, pagesTable } from './global.js';
import { render, tableEventTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

async function getEvents(){


    let url = new URL(`${apiHost}/siem/v1/events`);

    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 
  
    let eventData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));
  
    console.log(eventData);

    render(tableEventTemplate(eventData), divApp);
    pagesTable();

    // return eventData;
}


export { getEvents };