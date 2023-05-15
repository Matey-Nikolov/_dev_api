import { html } from "../../Global/globalLit.js";
import { refresh, btnLogin, btnRegister } from '../../Global/globalInport.js';

import { websitesRouter, endpointsRoute, eventRouter } from '../../Global/globalInport.js';

import { alertRouter } from "../../Global/globalInport.js"; 

const layoutSidenav = (role) =>{

    if (role === undefined) {
        return html`
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">New user</div>
                            <a class="nav-link" @click=${btnLogin}>
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
                            
                            <a class="nav-link" @click=${refresh}>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                refresh token
                            </a>

                            <!-- registerRouter -->
                            <!-- FIX - if admin -> true? -->
                                <div class="sb-sidenav-menu-heading">Register</div>

                                <a class="nav-link" @click=${btnRegister}>
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    new user
                                </a>


                            <div class="sb-sidenav-menu-heading">Nesho</div>

                            <a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Commands
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            
                            <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" @click=${endpointsRoute}>endpoints</a>
                                    <a class="nav-link" @click=${alertRouter}>alerts</a>
                                    <a class="nav-link" @click=${eventRouter}>events</a>
                                    <a class="nav-link" @click=${websitesRouter}>websites allow</a>
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