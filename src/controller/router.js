import { btnRegister, divApp } from './homeController.js';
import { registerTemplate, render, welcomePage, mainPage } from '../Global/globalLit.js';

import { endpoints, callAllEvents, callFilterWebsiteEvents, addAlloWebsite } from '../Global/globalInport.js';
import { getAlerts, filterLow, filterMedium, filterHigh} from '../Global/globalInport.js';

import { tableEventTemplate, tableEndpointsTemplate } from '../Global/globalLit.js';
import { tableAlertTemplate } from '../Global/globalLit.js';
import { chartAlerts } from '../Js/Charts/alertChart.js';

import { emptyError } from '../Global/globalLit.js';

import { tableAllowWebsiteTemplate, addNewWebsite } from '../Global/globalLit.js';
import { allowWebSite } from '../Global/globalInport.js';

let alerts = {};
let websites = new Set(); 

// -----------------------allow website router--------------------------
const websitesRouter = async () => {
    page.redirect('/websites');
};

const websiteAddRouter = async () =>{
    page.redirect('/add');

    render(welcomePage(addNewWebsite()), divApp);

    const btnWebsite = document.getElementById('allowWebsite');
    btnWebsite.addEventListener('click', async (event) =>{
        event.preventDefault();
        const getWebsiteURL = document.getElementById('website').value;

        console.log(getWebsiteURL);
        await addAlloWebsite(getWebsiteURL);

        page.redirect('/websites');
    });
};

page('/websites', async () => {
    websites = await allowWebSite();
    websites = [...websites];

    if (websites.length === 0) {
        render(welcomePage(tableAllowWebsiteTemplate(websites, emptyError('The exclusion list of allowed sites to visit is empty.'))), divApp);
        
    }else{
        render(welcomePage(tableAllowWebsiteTemplate(websites)), divApp);
    }
});
// ---------------------------------------------------------------------

// ---------------------eventRouter-------------------------------------
const eventAllRouter = async () =>{
    page.redirect('/events/all');
    let events = await callAllEvents();


    if (events.items.length  === 0 ) {
        render(welcomePage(tableEventTemplate(events, emptyError('No events from past 24 hours.'))), divApp);
    }else{
        render(welcomePage(tableEventTemplate(events)), divApp);
    }
};

const eventWebsiteRouter = async () =>{
    page.redirect('/events/websites');
    let events = await callFilterWebsiteEvents();

    if (events.items.length  === 0 ) {
        render(welcomePage(tableEventTemplate(events, emptyError('No events from type web.'))), divApp);
    }else{
        render(welcomePage(tableEventTemplate(events)), divApp);
    }
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
        render(welcomePage(emptyError('No alerts')), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertLowRouter = async () =>{
    page.redirect('/alerts/low');
    alerts = await filterLow();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type low.'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertMediumRouter = async () =>{
    page.redirect('/alerts/medium');
    alerts = await filterMedium();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type medium.'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertHighRouter = async () =>{
    page.redirect('/alerts/high');
    alerts = await filterHigh();

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type high.'))), divApp);
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

// -----------------------RegisterRouter-Still in progress-----------------------------
const registerRouter = () => {
    page.redirect('/createuser');
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

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute };
export { websitesRouter, websiteAddRouter };
export { eventAllRouter, eventWebsiteRouter };
export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter };