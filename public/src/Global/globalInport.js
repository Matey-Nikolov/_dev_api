// --------------------------ControlerNome=----------------------------
import { divApp, btnLogin, btnRegister } from '../controller/homeController.js';
// --------------------------------------------------------------------

// ---------------------------------Routers----------------------------
import { welcomeNavigator, loginRouter, registerRouter, logOutRouter,  websitesRouter } from '../controller/baseRouter.js';
import { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter } from '../controller/baseRouter.js';
import { eventAllRouter, eventWebsiteRouter, websiteAddRouter } from '../controller/baseRouter.js';
// --------------------------------------------------------------------

// ---------------------------------alerts-----------------------------
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from '../controller/baseRouter.js';
import { getAlerts, filterLow, filterMedium, filterHigh } from '../Js/alerts.js';
// --------------------------------------------------------------------

// ----------------------authentication--------------------------------
import { authenticationClass } from '../Js/authentication.js';
// --------------------------------------------------------------------

// ---------------------endpoint---------------------------------------
import { endpoints, endpointsTypeServer, endpointsTypeComputer } from '../Js/endpoint/endpoints.js';
// --------------------------------------------------------------------

// -----------------------event----------------------------------------
import { callAllEvents, callFilterWebsiteEvents } from '../Js/event.js';
// --------------------------------------------------------------------

// -----------------------webSite----------------------------------------
import { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, addAlloWebsite } from '../Js/webSite.js';
// --------------------------------------------------------------------

// ---------------------------------Firebase---------------------------
import { refresh } from '../firebase/firebase_RegisterLogin.js';
import { getInformation_Register } from '../firebase/validationRegister.js';
//---------------------------------------------------------------------

export { divApp, btnLogin, btnRegister };
export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, websitesRouter };
export { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter };
export { eventAllRouter, eventWebsiteRouter, websiteAddRouter };

export { authenticationClass };
export { endpoints, endpointsTypeServer, endpointsTypeComputer };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};

export { getAlerts, filterLow, filterMedium, filterHigh };
export { callAllEvents, callFilterWebsiteEvents };
export { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, addAlloWebsite };

export { refresh };
export { getInformation_Register }