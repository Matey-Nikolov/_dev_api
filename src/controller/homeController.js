import {post, whoIam, endpoints, getAlerts} from '../GlobalImport/globalInport.js'
import { registerTemplate, loginTemplate, buttonsTemplate, render, welcomePage } from '../GlobalImport/globalLit.js';

function getTypeId(typeId){
    const type = document.getElementById(typeId);
    return type;
}

const navBar = getTypeId('navBar');
const divApp = getTypeId('app');

render(buttonsTemplate(), navBar);
render(welcomePage(), divApp);

// const btnCall = getTypeId('new');
// const btnGet = getTypeId('get');
// const btnTenetInfo = getTypeId('info');
// const btnAlerts = getTypeId('alert');



const btnLogin = getTypeId('login');
const btnRegister = getTypeId('register');
// const btnLogOut = getTypeId('log_out');


// btnCall.addEventListener('click', post);
// btnGet.addEventListener('click', whoIam);

// btnLogOut.addEventListener('click', () =>{
//     render(buttonsTemplate(undefined), navBar);
//     render(welcomePage(), divApp);
// });

btnRegister.addEventListener('click', (event) =>{
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
});

btnLogin.addEventListener('click', (event) =>{

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

            const script = document.createElement('script');
            script.type = 'module';
            script.src = './src/controller/userController.js';

            document.body.appendChild(script);

            console.log(script);
        }

        inputUsername.value = '';
        inputPassword.value = '';
    });
});

/*
btnTenetInfo.addEventListener('click', () =>{
    endpoints(divApp);
});

btnAlerts.addEventListener('click', () =>{
    getAlerts();
});
*/


export { divApp };