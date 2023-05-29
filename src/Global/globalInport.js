// --------------------------ControlerNome=----------------------------
import { divApp, btnLogin, btnRegister } from '../controller/homeController.js';
// --------------------------------------------------------------------

// ---------------------------------Routers----------------------------
import { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, websitesRouter } from '../controller/router.js';
import { eventAllRouter, eventWebsiteRouter, websiteAddRouter } from '../controller/router.js';
// --------------------------------------------------------------------

// ---------------------------------alerts-----------------------------
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from '../controller/router.js';
import { getAlerts, filterLow, filterMedium, filterHigh, severityFilter } from '../Js/alerts.js';
// --------------------------------------------------------------------

// ----------------------authentication--------------------------------
import { authenticationClass } from '../Js/authentication.js';
// --------------------------------------------------------------------

// ----------------------refresh token--------------------------------
import { refresh } from '../Js/refreshToken.js';
// --------------------------------------------------------------------

// ---------------------endpoint---------------------------------------
import { endpoints } from '../Js/endpoints.js';
// --------------------------------------------------------------------

// -----------------------event----------------------------------------
import { callAllEvents, callFilterWebsiteEvents } from '../Js/event.js';
// --------------------------------------------------------------------

// -----------------------webSite----------------------------------------
import { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, addAlloWebsite } from '../Js/webSite.js';
// --------------------------------------------------------------------


// ---------------------------------Firebase---------------------------
import { loginUser, validationInput, newAccess_token } from '../firebase/registerCreate.js';
//---------------------------------------------------------------------

export { divApp, btnLogin, btnRegister };
export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, websitesRouter };
export { eventAllRouter, eventWebsiteRouter, websiteAddRouter };

export { authenticationClass };
export { refresh };
export { endpoints };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};

export { getAlerts, filterLow, filterMedium, filterHigh, severityFilter };
export { callAllEvents, callFilterWebsiteEvents };
export { allowWebSite, btnAllowWebsite, handleButtonClickAllow, handleButtonClickBlock, addAlloWebsite };

export { loginUser, validationInput, newAccess_token };