//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";

const buttonsTemplate = () =>{
    return html`
    <ul>
        <li>
            <button id="new">Call</button>
        </li>
        <li>
            <button id="get">get</button>
        </li>
        <li>
            <button id="info">info user</button>
        </li>
        <li>
            <button id="alert">alerts</button>
        </li>
        <li>
            <button id="login">login</button>
        </li>
        <li>
            <button id="register">register</button>
        </li>
    </ul>`;
}

export { buttonsTemplate };