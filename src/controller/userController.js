import { divApp, post, whoIam, endpoints, getAlerts } from '../GlobalImport/globalInport.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

console.log(divApp);


const btnCall = getTypeId('new');
const btnGet = getTypeId('get');
const btnTenetInfo = getTypeId('info');
const btnAlerts = getTypeId('alert');

console.log(btnCall);

btnCall.addEventListener('click', post);
btnGet.addEventListener('click', whoIam);


btnTenetInfo.addEventListener('click', () =>{
    endpoints(divApp);
});

btnAlerts.addEventListener('click', () =>{
    getAlerts();
});