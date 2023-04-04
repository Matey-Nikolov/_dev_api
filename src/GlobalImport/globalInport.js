import { divApp, logOut, btnLogin, btnRegister, welcomeNavigator } from '../controller/homeController.js';
import { post } from '../Js/authentication.js';
import { whoIam } from '../Js/authorization.js';
import { endpoints } from '../Js/endpoints.js';
import { getAlerts, filterLow, filterMedium, filterHigh, severityFilter } from '../Js/alerts.js';

import { createUser, loginUser } from '../firebase/registerCreate.js';

import { pagesTable } from '../Js/tablePagination.js';

export { post, whoIam, endpoints, getAlerts};
export { divApp, logOut, btnLogin, btnRegister, welcomeNavigator };
export { filterLow, filterMedium, filterHigh, severityFilter };

export { createUser, loginUser, pagesTable };