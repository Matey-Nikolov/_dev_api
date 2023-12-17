import { divApp } from './homeController.js';
import { alertError, registerTemplate, render, welcomePage } from '../Global/globalLit.js';

import { chartAlerts } from '../Js/Charts/alertChart.js';

import { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter, endpointReturnRouter, endpointDetailsRouter } from './routers/endpointRouter/endpoit.js';
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from './routers/alertRouter.js';
import { eventAllRouter, eventWebsiteRouter } from './routers/eventsRouter.js';
import { websitesRouter, websiteAddRouter } from './routers/websiteRouter.js';

// -----------------------logOutRouter--------------------------------
const logOutRouter = () => {
    logOut();
    page.redirect('/home');
};

const logOut = () => {
    render(welcomePage(undefined, 'true'), divApp);
};
// -------------------------------------------------------------------

// -----------------------RegisterRouter------------------------------
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

    if(chartAlerts()){
        render(welcomePage(), divApp);
    }
    else{
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