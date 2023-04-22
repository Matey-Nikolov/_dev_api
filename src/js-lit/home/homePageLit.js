//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../../Global/globalLit.js";

import { navBar } from "./navBar.js";
import { layoutSidenav } from "./layoutSidenav.js";
import { mainPage } from "./mainPage.js";
import { footerTemplate } from "./footer.js";

const welcomePage = (data, role) =>{

    // console.log(mainPage());

    return html`
    ${navBar()}
    <div id="layoutSidenav">
        ${layoutSidenav(role)}
        <div id="layoutSidenav_content">
            ${mainPage(data)}
            ${footerTemplate()}
        </div>
    </div>`;
}

export { welcomePage, mainPage, layoutSidenav };