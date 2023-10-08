// --------------------------Global-----------------------------
import { html, render, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// -------------------------------------------------------------

// --------------------------HomePage----------------------------
import { welcomePage, mainPage, layoutSidenav } from '../js-lit/home/homePageLit.js';
// --------------------------------------------------------------

// --------------------------Login-------------------------------
import { loginTemplate } from '../js-lit/loginPageLit.js';
// --------------------------------------------------------------

// -----------------------RegisterLit----------------------------
import { registerTemplate } from '../js-lit/RegisterLit.js';
// --------------------------------------------------------------

// ---------------------endpoints--------------------------------
import { tableEndpointsTemplate } from '../js-lit/endpointsLit.js';
// --------------------------------------------------------------

// -----------------------alerts---------------------------------
import { tableAlertTemplate } from '../js-lit/alertLit.js';
// --------------------------------------------------------------

// ----------------------event-----------------------------------
import { tableEventTemplate } from '../js-lit/eventLit.js';
// --------------------------------------------------------------

// ----------------------Allow website-----------------------------------
import { tableAllowWebsiteTemplate } from '../js-lit/webSiteLit.js';
import { addNewWebsite } from '../js-lit/addWebsiteLit.js';
// --------------------------------------------------------------

// ---------------------mainInfo--------------------------------
import { loginInfo } from '../js-lit/mainInfo/afterLoginLit.js';
import { afterAuthorization } from '../js-lit/mainInfo/afterAuthorizationLit.js';
import { emptyError } from '../js-lit/mainInfo/emptyError.js';
// --------------------------------------------------------------


export { html, css , render, LitElement};
export { welcomePage, mainPage, layoutSidenav };
export { loginTemplate };
export { registerTemplate };
export { tableEndpointsTemplate };
export { tableAlertTemplate };
export { tableEventTemplate };
export { tableAllowWebsiteTemplate, addNewWebsite };
export { loginInfo, afterAuthorization, emptyError };