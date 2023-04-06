import { divApp, logOut, btnLogin, btnRegister, welcomeNavigator, loginRouter, registerRouter, logOutRouter } from '../controller/homeController.js';
import { post } from '../Js/authentication.js';
import { whoIam } from '../Js/authorization.js';
import { endpoints, endpointsRoute } from '../Js/endpoints.js';
import { alertRouter, getAlerts, filterLow, filterMedium, filterHigh, severityFilter } from '../Js/alerts.js';

import { createUser, loginUser } from '../firebase/registerCreate.js';
import { pagesTable } from '../Js/tablePagination.js';


export { divApp, logOut, btnLogin, btnRegister, welcomeNavigator, loginRouter, registerRouter, logOutRouter };


export { post };
export { whoIam };
export { endpoints, endpointsRoute };
export { alertRouter, getAlerts, filterLow, filterMedium, filterHigh, severityFilter };

export { createUser, loginUser, pagesTable };