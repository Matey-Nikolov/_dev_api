import path from 'path';
import express from 'express';

import { setGlobal, apiHost, authorization, setDelete, setAllowPOST, websiteURL, setGlobalPOST } from './public/src/Js/global.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path
const __dirname = path.dirname(__filename); // Derive the directory name


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define an API routes
// -----------------------------------------------------------------
router.get('/alerts', async (request, res) => {
    const url = new URL(`${apiHost}/common/v1/alerts`);

    let websites = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    res.json(websites);
});
// -----------------------------------------------------------------

// ------------------/websites--------------------------------------
router.get('/websites', async (request, res) => {
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites?pageTotal=true`);

    let websites = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    res.json(websites);
});

// /post
router.get('/websites/post', async (request, res) => {
    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites`);

    await fetch(url, setAllowPOST(websiteURL))
    .then(response => response.json())
    .catch(error => console.log('error', error));
});

// /delete
router.get('websites/delete/:id', async (request, res) => {
    const getIdWebsite = request.params.id.replace(':', '');

    console.log(getIdWebsite);

    const url = new URL(`${apiHost}/endpoint/v1/settings/web-control/local-sites/:${getIdWebsite}`);

    await fetch(url, setDelete())
    .then(response => response.json())
    .catch(error => console.log('error', error));
});
// --------------------------------------------------------------------

// --------------------------------------------------------------------
router.get('/events', async (request, res) => {
    const url = new URL(`${apiHost}/siem/v1/events`);
    // url.searchParams.append('pageTotal', 'true'); 
    // //url.searchParams.append('pageSize', '1'); 

    let events = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    res.json(events);
});
// --------------------------------------------------------------------

// --------------------------------------------------------------------
router.get('/endpoints/scan/:endpointId', async (request, res) => {
    const getIdForScan = request.params.endpointId.replace(':', '');;

    let url = new URL(`${apiHost}/endpoint/v1/endpoints/${getIdForScan}/scans`);

    await fetch(url, setGlobalPOST());      

    console.log('Work 2222');

});

router.get('/endpoints', async (request, res) => {

    const url = new URL(`${apiHost}/endpoint/v1/endpoints`);
    url.searchParams.append('pageTotal', 'true'); 
    //url.searchParams.append('pageSize', '1'); 

    let endpoints = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    res.json(endpoints);
});

router.get('/endpoints/details/:endpointId', async (request, res) => {
    const getIdForDetails = request.params.endpointId.replace(':', '');

    const url = new URL(`${apiHost}/endpoint/v1/endpoints/${getIdForDetails}`);
    url.searchParams.append('pageTotal', 'true'); 

    let endpointDetails = await fetch(url, setGlobal())
    .then(response => response.json())
    .catch(error => console.log('error', error));

    res.json(endpointDetails);
});
// --------------------------------------------------------------------

// ---------------------/whoIam/:access--------------------------------
router.get('/whoIam/:access', async (request, res) => {
    const access = request.params.access.replace(':', '');

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + access);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
    const result = await response.json();

    authorization(result.id, result['apiHosts'].dataRegion, access);

    res.json(result);
});
// --------------------------------------------------------------------

// ---------------------/token/:client/:access-------------------------
router.get('/token/:client/:access', async (request, res) => {
    const client = request.params.client.replace(':', ''); // Remove ":" from client parameter
    const access = request.params.access.replace(':', '');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('scope', 'token');
    urlencoded.append('client_id', client);
    urlencoded.append('client_secret', access);


    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
    };

    const response = await fetch('https://id.sophos.com/api/v2/oauth2/token', requestOptions);
    const result = await response.json();
    const accessToken = result.access_token;

    const data = { token: accessToken };
    res.json(data);
});
// --------------------------------------------------------------------


export default router;