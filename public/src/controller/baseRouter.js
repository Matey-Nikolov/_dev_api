import { divApp } from './homeController.js';
import { alertError, registerTemplate, render, welcomePage } from '../Global/globalLit.js';

import { callAllEvents, callFilterWebsiteEvents, addAlloWebsite } from '../Global/globalInport.js';

import { tableEventTemplate } from '../Global/globalLit.js';
import { chartAlerts } from '../Js/Charts/alertChart.js';

import { emptyError } from '../Global/globalLit.js';

import { tableAllowWebsiteTemplate, addNewWebsite } from '../Global/globalLit.js';
import { allowWebSite } from '../Global/globalInport.js';
import { pagesTable } from '../Js/global.js';

import { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter, endpointReturnRouter, endpointDetailsRouter } from './routers/endpointRouter/endpoit.js';
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from './routers/alertRouter.js';

let websites = new Set(); 

// -----------------------allow website router--------------------------
const websitesRouter = () => {
    page.redirect('/websites');
};

const websiteAddRouter = () =>{
    page.redirect('/add');

    render(welcomePage(addNewWebsite()), divApp);

    const btnWebsite = document.getElementById('allowWebsite');
    const getWebsiteURL = document.getElementById('website');

    btnWebsite.addEventListener('click', async (event) =>{
        event.preventDefault();

        let websiteURL = getWebsiteURL.value.trim();
        let alreadyAdd = await addAlloWebsite(websiteURL);

        if (alreadyAdd) {
            getWebsiteURL.value = '';
            render(welcomePage(addNewWebsite('You already have it as an exception.')), divApp);
        }
        else{
            if (websiteURL === '') {
                render(welcomePage(addNewWebsite('Please enter the url.')), divApp);
            }else if(alreadyAdd === null){
                render(welcomePage(addNewWebsite('Please enter the valid url.')), divApp);
            }else{
                page.redirect('/websites');
            }
        }  
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

    pagesTable('event');

    if (events.items.length  === 0 ) {
        render(welcomePage(tableEventTemplate(events, emptyError('No events from past 24 hours.'))), divApp);
    }else{
        render(welcomePage(tableEventTemplate(events)), divApp);
    }
};

const eventWebsiteRouter = async () =>{
    page.redirect('/events/websites');
    let events = await callFilterWebsiteEvents();

    pagesTable('event');

    if (events.items.length  === 0 ) {
        render(welcomePage(tableEventTemplate(events, emptyError('No events from type web.'))), divApp);
    }else{
        render(welcomePage(tableEventTemplate(events)), divApp);
    }
};
// --------------------------------------------------------------------

// -----------------------logOutRouter--------------------------------
const logOutRouter = () => {
    logOut();
    page.redirect('/home');
};

const logOut = () => {
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

    if(chartAlerts() !== null){
        render(welcomePage(undefined, undefined, alertError('No alerts to create chart.')), divApp);
    }
});
// -------------------------------------------------------------------

// Start page.js
page();

export { welcomeNavigator, loginRouter, registerRouter, logOutRouter };

export { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter, endpointReturnRouter, endpointDetailsRouter };

export { websitesRouter, websiteAddRouter };
export { eventAllRouter, eventWebsiteRouter };
export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter };