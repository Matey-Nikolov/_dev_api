// --------------------------ControlerNome=----------------------------
import { divApp, btnLogin, btnRegister } from '../controller/homeController.js';
// --------------------------------------------------------------------

// ---------------------------------Routers----------------------------
import { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter } from '../controller/router.js';
// --------------------------------------------------------------------

// ---------------------------------alerts-----------------------------
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from '../controller/router.js';
import { getAlerts, filterLow, filterMedium, filterHigh, severityFilter } from '../Js/alerts.js';
// --------------------------------------------------------------------

// ----------------------authentication--------------------------------
import { post } from '../Js/authentication.js';
// --------------------------------------------------------------------

// ---------------------endpoint---------------------------------------
import { endpoints } from '../Js/endpoints.js';
// --------------------------------------------------------------------

// -----------------------event----------------------------------------
import { callEvents } from '../Js/event.js';
// --------------------------------------------------------------------

// -----------------------webSite----------------------------------------
import { btnAllowWebsite, handleButtonClick } from '../Js/webSite.js';
// --------------------------------------------------------------------


// ---------------------------------Firebase---------------------------
import { loginUser, validationInput } from '../firebase/registerCreate.js';
//---------------------------------------------------------------------

export { divApp, btnLogin, btnRegister };
export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter };

export { post };
export { endpoints };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};

export { getAlerts, filterLow, filterMedium, filterHigh, severityFilter };
export { callEvents };
export { btnAllowWebsite, handleButtonClick };

export { loginUser, validationInput };