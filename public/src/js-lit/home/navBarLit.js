import { html } from "../../Global/globalLit.js";
import { welcomeNavigator, logOutRouter } from '../../Global/globalInport.js';

const navBar = (role) =>{
    return html`
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" role="button" @click=${welcomeNavigator}>Welcome</a>
            ${role === 'admin' || role === 'guest' ? html`
                <!-- Sidebar Toggle-->
                <!-- <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button> -->
                <!-- Navbar-->
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" role="button">Settings</a></li>
                            <li><a class="dropdown-item" role="button">Activity Log</a></li>
                            <li><hr class="dropdown-divider" role="button"/></li>
                            <li><a class="dropdown-item" @click=${logOutRouter} role="button">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            ` : ''}
        </nav>
    `;
};

export { navBar };