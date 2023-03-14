import {post, whoIam, endpoints, getAlerts} from '../GlobalImport/globalInport.js'
import { loginTemplate, buttonsTemplate, render } from '../GlobalImport/globalLit.js';


const navBar = document.getElementById('navBar');
const divApp = document.getElementById('app');

render(buttonsTemplate(), navBar);

const btnCall = document.getElementById('new');
const btnGet = document.getElementById('get');
const btnTenetInfo = document.getElementById('info');
const btnAlerts = document.getElementById('alert');
const btnLogin = document.getElementById('login');



btnCall.addEventListener('click', post);
btnGet.addEventListener('click', whoIam);

btnLogin.addEventListener('click', (event) =>{

    event.preventDefault();

    render(loginTemplate(), divApp);

    const btn = document.getElementById('loginBtn');
    const inputUsername = document.getElementById('username');
    const inputPassword = document.getElementById('password');

    btn.addEventListener('click', (event) =>{

        event.preventDefault();

        // Validation
        sessionStorage.setItem('usernameLogin', inputUsername.value);
        sessionStorage.setItem('passwordLogin', inputPassword.value);
    
        inputUsername.value = '';
    });
});

btnTenetInfo.addEventListener('click', () =>{
    endpoints(divApp);
});

btnAlerts.addEventListener('click', () =>{
    getAlerts();
});

