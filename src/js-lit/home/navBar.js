import { html } from "../../Global/globalLit.js";
import { welcomeNavigator, logOutRouter } from '../../Global/globalInport.js';

// const buttonsTemplate = (name, role) =>{

//     /*
//     if(role === undefined){
//         return html`
//             <div class="container-fluid">
//                 <a class="navbar-brand" @click=${welcomeNavigator}>Welcome</a>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarCollapse">
//                 <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                 <li>
//                     <button @click=${post} class="btn btn-outline-success">who I'am</button>
//                     </li>
//                 </ul>
//                 <li class="nav-item">
//                         <button @click=${eventRouter} class="btn btn-outline-success">events</button>
//                     </li>
//                     <button @click=${btnLogin} class="btn btn-outline-success">login</button>
//                 </div>
//             </div>`;
//     }else if (role === 'admin'){
//         return html`
//         <div class="container-fluid">
//             <a class="navbar-brand" @click=${welcomeNavigator}>Welcome ${name}</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarCollapse">
//                 <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                     <li>
//                     <button @click=${post} class="btn btn-outline-success">who I'am</button>
//                     </li>
//                     <li class="nav-item">
//                         <button @click=${endpointsRoute} class="btn btn-outline-success">info user</button>
//                     </li>
//                     <li class="nav-item">
//                         <button @click=${alertRouter} class="btn btn-outline-success">alerts</button>
//                     </li>
//                     <li class="nav-item">
//                         <button @click=${eventRouter} class="btn btn-outline-success">events</button>
//                     </li>
//                 </ul>
//                 <li class="nav-item">
//                     <button @click=${registerRouter} class="btn btn-outline-success">register new</button>
//                     <button @click=${logOutRouter} class="btn btn-outline-success">log out</button>
//                 </li>
//             </div>
//         </div>`;
//     }else if (role === 'guest'){
//         return html`
//         <div class="container-fluid">
//             <a class="navbar-brand" @click=${welcomeNavigator}>Welcome ${name}</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarCollapse">
//                 <ul class="navbar-nav me-auto mb-2 mb-md-0">
//                     <li>
//                     <button @click=${post} class="btn btn-outline-success">who I'am</button>
//                     </li>
//                     <li class="nav-item">
//                         <button @click=${endpointsRoute} class="btn btn-outline-success">info user</button>
//                     </li>
//                     <li class="nav-item">
//                         <button @click=${alertRouter} class="btn btn-outline-success">alerts</button>
//                     </li>
//                 </ul>
//                 <li class="nav-item">
//                     <button @click=${logOutRouter} class="btn btn-outline-success">log out</button>
//                 </li>
//             </div>
//         </div>`;
//     }
//     */
// }

const navBar = () =>{
    return html`
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" @click=${welcomeNavigator}>Welcome</a>
            <!-- Sidebar Toggle-->
            <!-- <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button> -->
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item">Settings</a></li>
                        <li><a class="dropdown-item">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" @click=${logOutRouter}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    `;
};

export { navBar };