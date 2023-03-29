import {post, whoIam, endpoints, getAlerts} from '../GlobalImport/globalInport.js'
import { registerTemplate, loginTemplate, buttonsTemplate, render, welcomePage } from '../GlobalImport/globalLit.js';

import { createUser, loginUser } from '../GlobalImport/globalInport.js';

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

        let bool = loginUser(inputUsername.value, inputPassword.value);
        
        // console.log(bool);

        // if (bool) {
        //     console.log('okwaesrfdgthj');
        //     render(buttonsTemplate(inputUsername.value), navBar);
        //     render(welcomePage(), divApp);
        // }
        // else{
        //     alert('Incorrect password or username!');
        // }

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

        createUser(event, inputUsername.value, inputPassword.value);

        inputUsername.value = '';
        inputPassword.value = '';

        render(buttonsTemplate(), divApp);
        render(welcomePage(), divApp);
    });
};

const welcomeNavigator = () =>{
    render(welcomePage(), divApp);
};

const logOut = () =>{
    render(buttonsTemplate(), navBar);
    render(welcomePage(undefined), divApp);
};

render(buttonsTemplate(), navBar);
render(welcomePage(), divApp);

export { divApp, logOut, btnLogin, btnRegister, welcomeNavigator };