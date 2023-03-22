import { script, divApp, post, whoIam, endpoints, getAlerts } from '../GlobalImport/globalInport.js';
import { welcomePage, buttonsTemplate, tableTemplate, render } from '../GlobalImport/globalLit.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

console.log(divApp);

const btnCall = getTypeId('new');
const btnGet = getTypeId('get');
const btnTenetInfo = getTypeId('info');
const btnAlerts = getTypeId('alert');
const btnLogOut = getTypeId('log_out');


btnCall.addEventListener('click', post);
btnGet.addEventListener('click', whoIam);


btnTenetInfo.addEventListener('click', async () =>{
    let getEndpoints = await endpoints();

    render(tableTemplate(getEndpoints), divApp);
});

btnAlerts.addEventListener('click', () =>{
    getAlerts();
});

btnLogOut.addEventListener('click', () =>{
    render(buttonsTemplate(undefined), navBar);
    render(welcomePage(), divApp);

    console.log(script);
    script.type = 'module';
    script.src = './src/controller/homeController.js';

    script.onreadystatechange = tr;
    script.onload = callback;

});