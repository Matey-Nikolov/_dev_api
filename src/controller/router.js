import { divApp, navBar } from './homeController.js';
import { registerTemplate, buttonsTemplate, render, welcomePage } from '../Global/globalLit.js';
import { endpoints, getAlerts } from '../Global/globalInport.js';
// // console.log(divApp);
// // console.log(navBar);

// render(buttonsTemplate(), navBar);
// render(welcomePage(), divApp);

const endpointsRoute = () =>{
    page.redirect('/endpoints/');
    endpoints();
  };

const alertRouter = () =>{
    page.redirect('/alerts/');
    getAlerts();
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



page('/home', () => {
    render(welcomePage(), divApp);
});


page('/createUser', () =>{
    render(registerTemplate(), divApp);
});


page();

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, alertRouter, endpointsRoute };