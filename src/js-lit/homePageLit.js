//import {LitElement, html} from 'lit';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { html } from "../GlobalImport/globalLit.js";
import { post, whoIam, endpoints, endpointsRoute, alertRouter, getAlerts, logOut, btnLogin, btnRegister, welcomeNavigator } from '../GlobalImport/globalInport.js'

const buttonsTemplate = (name, role) =>{

    if(role === undefined){
        return html`
            <div class="container-fluid">
                <a class="navbar-brand" >Welcome</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0"></ul>
                    <button @click=${btnLogin} class="btn btn-outline-success">login</button>
                </div>
            </div>`;

    }else if (role === 'admin'){
        return html`
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
                        <button @click=${endpointsRoute} class="btn btn-outline-success">info user</button>
                    </li>
                    <li class="nav-item">
                        <button @click=${alertRouter} class="btn btn-outline-success">alerts</button>
                    </li>
                </ul>
                <li class="nav-item">
                    <button @click=${btnRegister} class="btn btn-outline-success">register new</button>
                    <button @click=${logOut} class="btn btn-outline-success">log out</button>
                </li>
            </div>
        </div>`;
    }else if (role === 'guest'){
        return html`
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
                </ul>
                <li class="nav-item">
                    <button @click=${logOut} class="btn btn-outline-success">log out</button>
                </li>
            </div>
        </div>`;
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

            <img src="src/photos/api.png" style="display: block; margin: auto;   width: 300px; height: 300px;">
        </div>

        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <img src="src/photos/api.svg" style="display: block; margin: auto;   width: 30px; height: 30px;">    
                    <!-- <svg class="bi" width="30" height="24" part></svg> -->
                    </a>
                    <span class="mb-3 mb-md-0 text-muted">&copy; 2023 ApiSchool, Inc</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-muted" href="https://github.com/Matey-Nikolov">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    </div>`;
}

const footerTemplate = () =>{
    return html`
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <img src="src/photos/api.svg" style="display: block; margin: auto;   width: 30px; height: 30px;">    
                    <!-- <svg class="bi" width="30" height="24" part></svg> -->
                    </a>
                    <span class="mb-3 mb-md-0 text-muted">&copy; 2023 ApiSchool, Inc</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-muted" href="https://github.com/Matey-Nikolov">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    `;
}

export { buttonsTemplate, welcomePage };