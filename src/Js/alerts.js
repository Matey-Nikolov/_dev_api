import { setGlobal, apiHost } from "./global.js";
import { render, tableAlertTemplate } from '../GlobalImport/globalLit.js';
import { divApp } from '../GlobalImport/globalInport.js';

async function getAlerts(){

    console.log(apiHost);

    let url = new URL(`${apiHost}/common/v1/alerts`);

    console.log(url);
    console.log(setGlobal);

    const alertsData = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
    console.log(alertsData);

    render(tableAlertTemplate(alertsData), divApp);

}

export { getAlerts };