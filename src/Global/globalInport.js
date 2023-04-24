import { divApp, btnLogin, btnRegister } from '../controller/homeController.js';
import { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter } from '../controller/router.js';

// ---------------------------------alertRouter---------------------------
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from '../controller/router.js';

import { post } from '../Js/authentication.js';

import { endpoints } from '../Js/endpoints.js';
import { getAlerts, filterLow, filterMedium, filterHigh, severityFilter } from '../Js/alerts.js';
import { callEvents, btnAllowWebsite } from '../Js/event.js';

import { createUser, loginUser } from '../firebase/registerCreate.js';

export { divApp, btnLogin, btnRegister };
export { welcomeNavigator, loginRouter, registerRouter, logOutRouter, endpointsRoute, eventRouter };



export { post };
export { endpoints };

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter};

export { getAlerts, filterLow, filterMedium, filterHigh, severityFilter };
export { callEvents, btnAllowWebsite };

export { createUser, loginUser };