import { html, render, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { welcomePage, mainPage, layoutSidenav } from '../js-lit/home/homePageLit.js';
import { loginTemplate } from '../js-lit/loginPageLit.js';
import { registerTemplate } from '../js-lit/RegisterLit.js';
import { tableEndpointsTemplate } from '../js-lit/endpointsLit.js';
import { tableAlertTemplate } from '../js-lit/alertLit.js';
import { tableEventTemplate } from '../js-lit/eventLit.js';

export { tableEndpointsTemplate, tableAlertTemplate, welcomePage, registerTemplate, tableEventTemplate };
export { html, css , render, loginTemplate, LitElement};
export { mainPage, layoutSidenav };