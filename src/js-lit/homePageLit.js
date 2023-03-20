//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";

const buttonsTemplate = (name) =>{

    if(name === undefined){
        return html`
        <ul>
            <li>
                <p>Welcome ${name}</p>
            </li>
            <li>
                <button id="login" class="btn btn-outline-info">login</button>
            </li>
            <li>
                <button id="register" class="btn btn-outline-info">register</button>
            </li>
        </ul>`;
    }else{
        return html`
        <ul>
            <li>
                <p>Welcome ${name}</p>
            </li>
            <li>
                <button id="new" class="btn btn-primary">Call</button>
            </li>
            <li>
                <button id="get" class="btn btn-primary">get</button>
            </li>
            <li>
                <button id="info" class="btn btn-primary">info user</button>
            </li>
            <li>
                <button id="alert" class="btn btn-primary">alerts</button>
            </li>
            <li>
                <button id="log_out" class="btn btn-primary">log out</button>
            </li>
        </ul>`;
    }
   
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