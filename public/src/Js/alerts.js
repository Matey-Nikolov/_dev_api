import { pagesTable } from "./global.js";
import { render, tableAlertTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

async function getAlerts(){
    const alertsData = await fetch('/alerts')
    .then(response => response.json())
    .catch(error => console.log('error', error));

    pagesTable();

    return alertsData;
};

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
};

async function filterLow(){
    const data = await getAlerts();

    filtered.items = data.items.filter(x => x.severity === 'low');
    filtered.pages = data.pages;

    return filtered;
};

async function filterMedium(){
    const data = await getAlerts();

    filtered.items = data.items.filter(x => x.severity === 'medium');
    filtered.pages = data.pages;

    return filtered;
};

async function filterHigh(){
    const data = await getAlerts();

    filtered.items = data.items.filter(x => x.severity === 'high');
    filtered.pages = data.pages;

    return filtered;
};

export { getAlerts, filterLow, filterMedium, filterHigh, severityFilter };