import { loginTemplate, render, welcomePage, registerTemplate } from '../Global/globalLit.js';

import { loginUser, validationInput } from '../Global/globalInport.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');

const btnLogin = (event) =>{
    event.preventDefault();


    render(welcomePage(loginTemplate()), divApp);

    const btn = getTypeId('loginBtn');

    btn.addEventListener('click', (event) =>{

        event.preventDefault();

        const inputUsername = getTypeId('username');
        const inputPassword = getTypeId('password');

        loginUser(inputUsername.value, inputPassword.value);

        inputUsername.value = '';
        inputPassword.value = '';
    });
};

const btnRegister = (event) =>{
    event.preventDefault();

    render(welcomePage(registerTemplate()), divApp);

    const btn = getTypeId('registerPage');

    const inputFirstName = getTypeId('inputFirstName');
    const inputLastName = getTypeId('inputLastName');
    const inputRole = getTypeId('role');
    const inputClient_id = getTypeId('client_id');
    const inputClient_secret = getTypeId('client_secret');

    const inputPassword = getTypeId('password');

    btn.addEventListener('click', (event) =>{
        event.preventDefault();

        const username = inputFirstName.value.trim() + ' ' + inputLastName.value.trim();
        validationInput(username, inputPassword.value, inputRole.value, inputClient_id.value, inputClient_secret.value);
    });
};

render(welcomePage(), divApp);

export { divApp, navBar, btnLogin, btnRegister };