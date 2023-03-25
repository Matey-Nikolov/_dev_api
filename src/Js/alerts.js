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

async function filter(){
    const data = await getAlerts();
    console.log(data);

    let filtered = {
        'items': {},
        'pages': {}
    };

    filtered.items = data.items.filter(x => x.severity === 'low');
    filter.pages = data.pages;

    render(tableAlertTemplate(filtered), divApp);
}

export { getAlerts, filter };