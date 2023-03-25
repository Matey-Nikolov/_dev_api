//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";
import { post, whoIam, endpoints, getAlerts, logOut, btnLogin, btnRegister, welcomeNavigator } from '../GlobalImport/globalInport.js'

const buttonsTemplate = (name) =>{

    console.log(welcomeNavigator);

    if(name === undefined){
        return html`
            <div class="container-fluid">
                <a class="navbar-brand" @click=${welcomePage}>Welcome ${name}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0"></ul>
                    <button @click=${btnLogin} class="btn btn-outline-success">login</button>
                    <button @click=${btnRegister} class="btn btn-outline-success">register</button>
                </div>
            </div>`;

    }else{
        return html`
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" @click=${welcomePage}>Welcome ${name}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li>
                    <button @click=${post} class="btn btn-outline-success">Call</button>
                    </li>
                    <li class="nav-item">
                        <button @click=${whoIam} class="btn btn-outline-success">get</button>
                    </li>
                    <li class="nav-item">
                        <button @click=${endpoints} class="btn btn-outline-success">info user</button>
                    </li>
                    <li class="nav-item">
                        <button @click=${getAlerts} class="btn btn-outline-success">alerts</button>
                    </li>
                    <li class="nav-item">
                        <button @click=${logOut} class="btn btn-outline-success">log out</button>
                    </li>
                </ul>
                    <button @click=${btnLogin} class="btn btn-outline-success">login</button>
                    <button @click=${btnRegister} class="btn btn-outline-success">register</button>
                </div>
            </div>
        </nav>`;
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