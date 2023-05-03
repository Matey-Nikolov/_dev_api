import { btnRegister, divApp } from './homeController.js';
import { registerTemplate, render, welcomePage, mainPage } from '../Global/globalLit.js';

import { endpoints, callEvents } from '../Global/globalInport.js';
import { getAlerts, filterLow, filterMedium, filterHigh} from '../Global/globalInport.js';

import { tableEventTemplate, tableEndpointsTemplate } from '../Global/globalLit.js';
import { tableAlertTemplate, errorAlert } from '../Global/globalLit.js';
import { chartAlerts } from '../Js/Charts/alertChart.js';

let alerts = {};

// ---------------------eventRouter-------------------------------------
const eventRouter = async () =>{
    page.redirect('/events');
    let events = await callEvents();

    render(welcomePage(tableEventTemplate(events)), divApp);
};
// --------------------------------------------------------------------

// -----------------------endpointsRoute-------------------------------
const endpointsRoute = async () =>{
    page.redirect('/endpoints/');
    let getEndpoints = await endpoints();
    // console.log(getEndpoints);
    render(welcomePage(tableEndpointsTemplate(getEndpoints)), divApp);
};
// --------------------------------------------------------------------

// -----------------------alertRouter----------------------------------
const alertRouter = async () =>{
    page.redirect('/alerts/all');
    alerts = await getAlerts();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(errorAlert('No alerts')), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertLowRouter = async () =>{
    page.redirect('/alerts/low');
    alerts = await filterLow();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, errorAlert('No alerts from type low!'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertMediumRouter = async () =>{
    page.redirect('/alerts/medium');
    alerts = await filterMedium();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, errorAlert('No alerts from type medium!'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertHighRouter = async () =>{
    page.redirect('/alerts/high');
    alerts = await filterHigh();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, errorAlert('No alerts from type high!'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};
// -------------------------------------------------------------------

// -----------------------logOutRouter--------------------------------
const logOutRouter = () => {
    logOut();
    page.redirect('/home');
};

const logOut = () => {
    sessionStorage.removeItem('token');
    render(welcomePage(undefined, 'true'), divApp);
};
// -------------------------------------------------------------------

// -----------------------RegisterRouter------------------------------
const registerRouter = () => {
    page.redirect('/create');
    render(welcomePage(registerTemplate()), divApp);
};

page('/createUser', () =>{
    render(welcomePage(registerTemplate()), divApp);
});
// -------------------------------------------------------------------

// ---------------LoginRouter-----------------------------------------
const loginRouter = () => {
    page.redirect('/login');
};
// -------------------------------------------------------------------

// ---------------------WelcomeNavigator------------------------------
const welcomeNavigator = () => {
    page.redirect('/home');
};

page('/home', () => {
    render(welcomePage(), divApp);
    chartAlerts();
});
// -------------------------------------------------------------------

// Start page.js
page();

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};