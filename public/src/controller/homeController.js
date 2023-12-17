import { loginTemplate, render, welcomePage, registerTemplate } from '../Global/globalLit.js';

import { getInformation_Register } from '../Global/globalInport.js';
import { loginUser, createUser } from '../firebase/firebase_RegisterLogin.js';

import { registerRouter } from '../Global/globalInport.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');

let inputUsername;
let inputPassword;

// ---------------------Login button-----------------------------------
const btnLogin = (event) =>{
    event.preventDefault();

    render(welcomePage(loginTemplate()), divApp);

    const btn = getTypeId('loginBtn');

    btn.addEventListener('click', async (event) =>{

        event.preventDefault();

        inputUsername = getTypeId('username');
        inputPassword = getTypeId('password');

        loginUser(inputUsername.value, inputPassword.value);

        inputUsername.value = '';
        inputPassword.value = '';
    });
};
// --------------------------------------------------------------------

// ---------------------Register button--------------------------------
const btnRegister = (event) =>{
    event.preventDefault();

    render(welcomePage(registerTemplate()), divApp);

    const btn = getTypeId('registerPage');

    const inputUsername = getTypeId('inputUsername');

    const inputRole = getTypeId('inputRole');

    const inputClient_Id = getTypeId('client_Id');
    const inputClient_Secret = getTypeId('client_Secret');

    const inputPassword = getTypeId('password');

    registerRouter();

    btn.addEventListener('click', (event) =>{
        event.preventDefault();

        getInformation_Register.username = inputUsername.value.trim();

        getInformation_Register.role = inputRole.value.trim();

        getInformation_Register.client_Id = inputClient_Id.value.trim();
        getInformation_Register.Client_Secret = inputClient_Secret.value.trim();

        getInformation_Register.password = inputPassword.value.trim();

        createUser(event);
    });
};
// --------------------------------------------------------------------

// ------------------Render main data----------------------------------
render(welcomePage(), divApp);
// --------------------------------------------------------------------

export { divApp, navBar, btnLogin, btnRegister };