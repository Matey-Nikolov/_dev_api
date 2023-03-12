import { post } from './authentication.js';
import { whoIam } from './authorization.js';
import { endpoints } from './endpoints.js';
import { getAlerts } from './alerts.js';

const btnCall = document.getElementById('new');
const btnGet = document.getElementById('get');
const btnTenetInfo = document.getElementById('info');
const btnAlerts = document.getElementById('alert');

const divApp = document.getElementById('app');


btnCall.addEventListener('click', post);
btnGet.addEventListener('click', whoIam);

btnTenetInfo.addEventListener('click', () =>{
    endpoints(divApp);
});

btnAlerts.addEventListener('click', () =>{
    getAlerts();
});