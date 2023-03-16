//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";

const buttonsTemplate = (name) =>{
    return html`
    <ul>
        <li>
            <p>Welcome ${name}</p>
        </li>
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

const welcomePage = () =>{

    return html`
    <div class="bgimg">
        <div class="topleft">
            <p>Logo</p>
        </div>
        <div class="middle">
            <h1>COMING SOON</h1>
            <hr>
            <p id="demo" style="font-size:30px"></p>
        </div>
        <footer>
            <p>2023 16 05</p>
        </footer>
    </div>`;
}

export { buttonsTemplate, welcomePage };