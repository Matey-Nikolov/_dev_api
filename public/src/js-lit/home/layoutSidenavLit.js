import { html } from "../../Global/globalLit.js";
import { refresh, btnLogin, btnRegister } from '../../Global/globalInport.js';

import { websitesRouter, endpointsRoute, eventAllRouter } from '../../Global/globalInport.js';

import { alertRouter } from "../../Global/globalInport.js"; 

const layoutSidenav = (role) =>{

    if (role === undefined) {
        return html`
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">New user</div>
                            <a class="nav-link" role="button" @click=${btnLogin}>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Sign in
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Sign in to see your role.</div>
                    </div>
                </nav>
            </div>
        `;
    }else{ // === 'admin'
        return html`
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            
                            <a class="nav-link" role="button" @click=${refresh}>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                refresh token
                            </a>

                            ${role === 'admin' ? html`
                                <div class="sb-sidenav-menu-heading">Register</div>
                                <a class="nav-link" role="button" @click=${btnRegister}>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                new user
                                </a>` :
                                html``
                            }

                            <div class="sb-sidenav-menu-heading">Nesho</div>

                            <a class="nav-link collapsed" role="button" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Commands
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            
                            <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" role="button" @click=${endpointsRoute}>endpoints</a>
                                    <a class="nav-link" role="button" @click=${alertRouter}>alerts</a>
                                    <a class="nav-link" role="button" @click=${eventAllRouter}>events</a>
                                    <a class="nav-link" role="button" @click=${websitesRouter}>websites allow</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        ${role}
                    </div>
                </nav>
            </div>
        `;
    }
};

export { layoutSidenav };