import { loginTemplate, buttonsTemplate, render, welcomePage } from '../Global/globalLit.js';

import { createUser, loginUser } from '../Global/globalInport.js';
// import { welcomeNavigator } from '../Global/globalInport.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');



const btnLogin = (event) =>{
    event.preventDefault();

    render(loginTemplate(), divApp);

    const btn = getTypeId('loginBtn');
    const inputUsername = getTypeId('username');
    const inputPassword = getTypeId('password');

    btn.addEventListener('click', (event) =>{

        event.preventDefault();


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

render(buttonsTemplate(), navBar);
render(welcomePage(), divApp);

export { divApp, navBar, btnLogin, btnRegister };