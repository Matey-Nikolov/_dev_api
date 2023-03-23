import {post, whoIam, endpoints, getAlerts} from '../GlobalImport/globalInport.js'
import { registerTemplate, loginTemplate, buttonsTemplate, render, welcomePage } from '../GlobalImport/globalLit.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');

const btnLogin = (event) =>{
    event.preventDefault();

    render(loginTemplate(), divApp);

    console.log(divApp);


    const btn = getTypeId('loginBtn');
    const inputUsername = getTypeId('username');
    const inputPassword = getTypeId('password');

    btn.addEventListener('click', (event) =>{

        event.preventDefault();

        // Validation - work
        if (inputUsername.value === sessionStorage.getItem('usernameLogin') && inputPassword.value === sessionStorage.getItem('passwordLogin')) {

            render(buttonsTemplate(sessionStorage.getItem('usernameLogin')), navBar);
            render(welcomePage(), divApp);
        }

        inputUsername.value = '';
        inputPassword.value = '';
    });
};

const btnRegister = (event) =>{
    event.preventDefault();

    render(registerTemplate(), divApp);
    
    const btn = getTypeId('registerPage');
    const inputUsername = getTypeId('username');
    const inputPassword = getTypeId('password');

    console.log(btn);

    btn.addEventListener('click', (event) =>{
        event.preventDefault();
        
        // register - work
        sessionStorage.setItem('usernameLogin', inputUsername.value);
        sessionStorage.setItem('passwordLogin', inputPassword.value);
    
        inputUsername.value = '';
        inputPassword.value = '';
    });
};

const logOut = () =>{
    console.log('ok');
    
    render(buttonsTemplate(), navBar);
    render(welcomePage(undefined), divApp);
};

render(buttonsTemplate(), navBar);
render(welcomePage(), divApp);

export { divApp, logOut, btnLogin, btnRegister };