import {post, whoIam, endpoints, getAlerts} from '../GlobalImport/globalInport.js'
import { registerTemplate, loginTemplate, buttonsTemplate, render, welcomePage, html } from '../GlobalImport/globalLit.js';

import { createUser, loginUser } from '../GlobalImport/globalInport.js';


function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');

const btnLogin = (event) =>{
    event.preventDefault();
// console.log(divApp);

    render(loginTemplate(), divApp);

    const btn = getTypeId('loginBtn');
    const inputUsername = getTypeId('username');
    const inputPassword = getTypeId('password');

    btn.addEventListener('click', (event) =>{

        event.preventDefault();


        let bool = loginUser(inputUsername.value, inputPassword.value);

        if (bool) {
            console.log('True');
        }

        // TODO VALIDATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        inputUsername.value = '';
        inputPassword.value = '';
    });
};

const btnRegister = (event) =>{
    event.preventDefault();

    
    const btn = getTypeId('registerPage');
    
    const role = getTypeId('role');
    const inputUsername = getTypeId('username');
    const inputPassword = getTypeId('password');

    btn.addEventListener('click', (event) =>{
        event.preventDefault();

        createUser(event, inputUsername.value, inputPassword.value, role.value);

        inputUsername.value = '';
        inputPassword.value = '';

        render(buttonsTemplate(), divApp);
        render(welcomePage(), divApp);
    });
};

const logOutRouter = () => {
    logOut();
    page.redirect('/home');
};

const registerRouter = () => {
    page.redirect('/createUser');
};

const loginRouter = () => {
    page.redirect('/login');
};

const welcomeNavigator = () => {
    page.redirect('/home');
};

const logOut = () => {
    render(buttonsTemplate(), navBar);
    render(welcomePage(undefined), divApp);
};

render(buttonsTemplate(), navBar);
render(welcomePage(), divApp);


page('/home', () => {
    render(welcomePage(), divApp);
});

// page('/login', () => {
//     render(loginTemplate(), divApp);
// });

page('/createUser', () =>{
    render(registerTemplate(), divApp);
});


page();

export { divApp, logOut, btnLogin, btnRegister  };
export { welcomeNavigator, loginRouter, registerRouter, logOutRouter};