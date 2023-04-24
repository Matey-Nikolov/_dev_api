//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../../Global/globalLit.js";

import { navBar } from "./navBar.js";
import { layoutSidenav } from "./layoutSidenav.js";
import { mainPage } from "./mainPage.js";
import { footerTemplate } from "./footer.js";

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

    console.log(role);
    console.log(staticRole);

    if (staticRole === '' && role === undefined) {

        console.log('ok');

        return html`
        ${navBar()}
        <div id="layoutSidenav">
            ${layoutSidenav()}
            <div id="layoutSidenav_content">
                ${mainPage(data)}
                ${footerTemplate()}
            </div>
        </div>`;
    }else if(role !== undefined){
        staticRole = role;

        return html`
        ${navBar()}
        <div id="layoutSidenav">
            ${layoutSidenav(role)}
            <div id="layoutSidenav_content">
                ${mainPage(data)}
                ${footerTemplate()}
            </div>
        </div>`;
    }else if(staticRole !== role){
        return html`
        ${navBar()}
        <div id="layoutSidenav">
            ${layoutSidenav(staticRole)}
            <div id="layoutSidenav_content">
                ${mainPage(data)}
                ${footerTemplate()}
            </div>
        </div>`;
    }
};

export { welcomePage, mainPage, layoutSidenav, staticRole };