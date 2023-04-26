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
import { tableAlertTemplate, emptyAlert } from '../js-lit/alertLit.js';
// --------------------------------------------------------------

// ----------------------event-----------------------------------
import { tableEventTemplate } from '../js-lit/eventLit.js';
// --------------------------------------------------------------

export { html, css , render, LitElement};
export { welcomePage, mainPage, layoutSidenav };
export { loginTemplate };
export { registerTemplate };
export { tableEndpointsTemplate };
export { tableAlertTemplate, emptyAlert };
export { tableEventTemplate };