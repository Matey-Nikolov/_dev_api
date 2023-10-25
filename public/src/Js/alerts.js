import { pagesTable } from "./global.js";
import { render, tableAlertTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

let sortedAlerts = {
    'items': {},
    'pages': {}
};

async function getAlerts(){
    const alertsData = await fetch('/alerts')
    .then(response => response.json())
    .catch(error => console.log('error', error));

    sortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);
    sortedAlerts.pages = alertsData.pages;

    pagesTable();

    return sortedAlerts;
};

function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    if (timeA > timeB) 
        return -1;

    if (timeA < timeB) 
        return 1;

    return 0;
}

let filteredAlerts = {
    'items': {},
    'pages': {}
};

async function filterLow(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'low');
    filteredAlerts.pages = sortedAlerts.pages;

    pagesTable();

    return filteredAlerts;
};

async function filterMedium(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'medium');
    filteredAlerts.pages = sortedAlerts.pages;

    pagesTable();

    return filteredAlerts;
};

async function filterHigh(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'high');
    filteredAlerts.pages = sortedAlerts.pages;

    pagesTable();

    return filteredAlerts;
};

export { getAlerts, filterLow, filterMedium, filterHigh };