//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../../Global/globalLit.js";

import { navBar } from "./navBarLit.js";
import { layoutSidenav } from "./layoutSidenavLit.js";
import { mainPage } from "./mainPageLit.js";
import { footerTemplate } from "./footerLit.js";

let staticRole = '';

const welcomePage = (data, role) =>{

    if(role === 'true'){
        staticRole = '';
        
        return html`
        ${navBar()}
        <div id="layoutSidenav">
            ${layoutSidenav()}
            <div id="layoutSidenav_content">
                ${mainPage(data)}
                ${footerTemplate()}
            </div>
        </div>`;
    }

    if (staticRole === '' && role === undefined) {
        return html`
        ${navBar()}
        <div id="layoutSidenav" class="gradient-custom">
            ${layoutSidenav()}
            <div id="layoutSidenav_content">
                ${mainPage(data)}
                ${footerTemplate()}
            </div>
        </div>`;
    }else if(role !== undefined){
        staticRole = role;

        return html`
        ${navBar(staticRole)}
        <div id="layoutSidenav" class="gradient-custom">
            ${layoutSidenav(staticRole)}
            <div id="layoutSidenav_content">
                ${mainPage(data, staticRole)}
                ${footerTemplate()}
            </div>
        </div>`;
    }else if(staticRole !== role){
        return html`
        ${navBar(staticRole)}
        <div id="layoutSidenav" class="gradient-custom">
            ${layoutSidenav(staticRole)}
            <div id="layoutSidenav_content">
                ${mainPage(data, staticRole)}
                ${footerTemplate()}
            </div>
        </div>`;
    }
};

export { welcomePage, mainPage, layoutSidenav, staticRole };