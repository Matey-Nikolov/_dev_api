import { btnRegister, divApp } from './homeController.js';
import { registerTemplate, render, welcomePage } from '../Global/globalLit.js';
import { endpoints, callEvents } from '../Global/globalInport.js';

import { getAlerts, filterLow, filterMedium, filterHigh} from '../Global/globalInport.js';

import { tableEventTemplate, tableAlertTemplate, tableEndpointsTemplate } from '../Global/globalLit.js';

let alerts = {};

// eventRouter
// ---------------------eventRouter--------------------------------------
const eventRouter = async () =>{
    page.redirect('/events');
    let events = await callEvents();

    render(welcomePage(tableEventTemplate(events)), divApp);
};
// ---------------------------------------------------------------------

// -----------------------endpointsRoute---------------------------------
const endpointsRoute = async () =>{
    page.redirect('/endpoints/');
    let getEndpoints = await endpoints();
    console.log(getEndpoints);
    render(welcomePage(tableEndpointsTemplate(getEndpoints)), divApp);
};
// ---------------------------------------------------------------------

// -----------------------alertRouter-----------------------------------
const alertRouter = async () =>{
    page.redirect('/alerts/');
    alerts = await getAlerts();

    render(welcomePage(tableAlertTemplate(alerts)), divApp);
};

const alertLowRouter = async () =>{
    page.redirect('/alerts/low');
    alerts = await filterLow();

    render(welcomePage(tableAlertTemplate(alerts)), divApp);
};

const alertMediumRouter = async () =>{
    page.redirect('/alerts/medium');
    alerts = await filterMedium();

    render(welcomePage(tableAlertTemplate(alerts)), divApp);
};

const alertHighRouter = async () =>{
    page.redirect('/alerts/high');
    alerts = await filterHigh();

    render(welcomePage(tableAlertTemplate(alerts)), divApp);
};
// --------------------------------------------------------------------

// -----------------------logOutRouter---------------------------------
const logOutRouter = () => {
    logOut();
    page.redirect('/home');
};

const logOut = () => {
    sessionStorage.removeItem('token');
    render(welcomePage(undefined, 'true'), divApp);
};
// --------------------------------------------------------------------


const registerRouter = () => {
    page.redirect('/createUser');
};

const loginRouter = () => {
    page.redirect('/login');
};

const welcomeNavigator = () => {
    page.redirect('/home');
};


page('/home', () => {
    render(welcomePage(), divApp);
});


page('/createUser', () =>{
    render(welcomePage(registerTemplate()), divApp);
});


page();

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};