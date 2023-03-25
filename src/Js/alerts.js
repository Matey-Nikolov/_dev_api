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
    console.log(divApp);
}

function filter(alerts){
    // let filtered = alerts.items.filter( x => x.severity === 'high');

    console.log(alerts);
    console.log('ok');
}

export { getAlerts, filter };