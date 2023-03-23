//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";
import { post, whoIam, endpoints, getAlerts, logOut, btnLogin, btnRegister } from '../GlobalImport/globalInport.js'

const buttonsTemplate = (name) =>{

    if(name === undefined){
        return html`
        <ul>
            <li>
                <p>Welcome ${name}</p>
            </li>
            <li>
                <button @click=${btnLogin} class="btn btn-outline-info">login</button>
            </li>
            <li>
                <button @click=${btnRegister} class="btn btn-outline-info">register</button>
            </li>
        </ul>`;
    }else{
        return html`
        <ul>
            <li>
                <p>Welcome ${name}</p>
            </li>
            <li>
                <button @click=${post} class="btn btn-primary">Call</button>
            </li>
            <li>
                <button @click=${whoIam} class="btn btn-primary">get</button>
            </li>
            <li>
                <button @click=${endpoints} class="btn btn-primary">info user</button>
            </li>
            <li>
                <button @click=${getAlerts} class="btn btn-primary">alerts</button>
            </li>
            <li>
                <button @click=${logOut} class="btn btn-primary">log out</button>
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
        </div>

        <hr>

        <footer>
            <p>2023 16 05</p>
        </footer>
    </div>`;
}

export { buttonsTemplate, welcomePage };