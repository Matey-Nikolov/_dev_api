import { loginTemplate, render, welcomePage, mainPage, registerTemplate } from '../Global/globalLit.js';

import { createUser, loginUser, registerRouter } from '../Global/globalInport.js';
// import { welcomeNavigator } from '../Global/globalInport.js';

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

        // TODO VALIDATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let bool = loginUser(inputUsername.value, inputPassword.value);

        // welcomeNavigator();

        // if (bool) {
        //     console.log('True');
        // }

        inputUsername.value = '';
        inputPassword.value = '';
    });
};

const btnRegister = (event) =>{
    event.preventDefault();

    
    render(welcomePage(registerTemplate()), divApp);

    const btn = getTypeId('registerPage');
    

    console.log(btn);

    const inputFirstName = getTypeId('inputFirstName');
    const inputLastName = getTypeId('inputLastName');
    const inputRole = getTypeId('role');
    const inputClient_id = getTypeId('client_id');
    const inputClient_secret = getTypeId('client_secret');



    const inputPassword = getTypeId('password');
    


    btn.addEventListener('click', (event) =>{
        event.preventDefault();

        const username = inputFirstName.value + ' ' + inputLastName.value;

        console.log(username);
        console.log(inputRole.value);
        console.log(inputClient_id.value);
        console.log(inputClient_secret.value);
        console.log(inputPassword.value);

        createUser(event, username, inputPassword.value, inputRole.value, inputClient_id.value, inputClient_secret.value);
        // render(welcomePage(), divApp);
    });
};


render(welcomePage(), divApp);

const mainApp = document.querySelector('main div');
console.log(mainApp);

console.log(divApp);

export { divApp, navBar, btnLogin, btnRegister };