import { setGlobal, apiHost } from "./global.js";


async function getAlerts(){

    console.log(apiHost);

    let url = new URL(`${apiHost}/common/v1/alerts`);

    console.log(url);

    const data = await fetch(url, setGlobal)
    .then(response => response.json())
    .catch(error => console.log('error', error));

    console.log(data);
}

export { getAlerts };