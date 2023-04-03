import { setGlobal, apiHost } from "./global.js";
import { render, tableAlertTemplate, buttonsTemplate } from '../GlobalImport/globalLit.js';
import { divApp } from '../GlobalImport/globalInport.js';

async function getAlerts(){


    let url = new URL(`${apiHost}/common/v1/alerts`);

    console.log(url);
    console.log(setGlobal);

    const alertsData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
    render(tableAlertTemplate(alertsData), divApp);

    return alertsData;
}

let filtered = {
    'items': {},
    'pages': {}
};

async function severityFilter(severityFilter){
    const data = await getAlerts();
    

    switch(severityFilter){
        case'low':
            filtered.items = data.items.filter(x => x.severity === 'low');
            filtered.pages = data.pages;
        break;
        case'medium':
            filtered.items = data.items.filter(x => x.severity === 'low');
            filtered.pages = data.pages;
        break;
        case'high':
            filtered.items = data.items.filter(x => x.severity === 'low');
            filtered.pages = data.pages;
        break;
    }



    render(tableAlertTemplate(filtered), divApp);
}

async function filterMedium(){
    const data = await getAlerts();

    filtered.items = data.items.filter(x => x.severity === 'medium');
    filtered.pages = data.pages;

    render(tableAlertTemplate(filtered), divApp);
}

async function filterHigh(){
    const data = await getAlerts();

    filtered.items = data.items.filter(x => x.severity === 'high');
    filtered.pages = data.pages;

    render(tableAlertTemplate(filtered), divApp);
}


export { getAlerts, filterLow, filterMedium, filterHigh };