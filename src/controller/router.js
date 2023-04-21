import { divApp, navBar } from './homeController.js';
import { registerTemplate, buttonsTemplate, render, welcomePage } from '../Global/globalLit.js';
import { endpoints, getAlerts, callEvents } from '../Global/globalInport.js';

import { tableEventTemplate, tableAlertTemplate } from '../Global/globalLit.js';
// // console.log(divApp);
// // console.log(navBar);

// render(buttonsTemplate(), navBar);
// render(welcomePage(), divApp);

const eventRouter = async () =>{
    page.redirect('/events');
    let events = await callEvents();

    render(welcomePage(tableEventTemplate(events)), divApp);
};

const endpointsRoute = () =>{
    page.redirect('/endpoints/');
    endpoints();
  };

const alertRouter = async () =>{
    page.redirect('/alerts/');
    let alerts = await getAlerts();

    render(welcomePage(tableAlertTemplate(alerts)), divApp);
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
    sessionStorage.removeItem('token');
    render(buttonsTemplate(), navBar);
    render(welcomePage(), divApp);
};



page('/home', () => {
    render(welcomePage(), divApp);
});


page('/createUser', () =>{
    render(welcomePage(registerTemplate()), divApp);
});


page();

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, alertRouter, endpointsRoute, eventRouter };