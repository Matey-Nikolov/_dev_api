import { html } from '../../Global/globalLit.js';
import { btnLogin } from '../../Global/globalInport.js';

const mainPage = (data, role, error) =>{
    if (data === undefined && role !== 'admin' && role !== 'guest') {
        return html`
        <main id="main">
            <div class="container-fluid px-4">
                <div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header">
                                        <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                                        <h5 class="text-center font-weight-light my-4">To view all website, please <a role="button" @click=${btnLogin}><b>login</b></a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `;
    }else if(data !== undefined && error === undefined){ 
        return html`${data}`;
    }
    else if(role === 'admin' || role === 'guest'){
        return html`
        <main id="main">
            <div class="container-fluid px-4">
                <div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                                    <p class="text-center font-weight-light my-4">
                                        You have access to alerts, endpoints, events and allow websites.
                                    </p>
                                </div>
                            </div>
                        </div>

                        ${error !== undefined ? 
                            html`
                                <div class="row justify-content-left">
                                    <div class="col-lg-5 card shadow-lg border-0 rounded-lg mt-5">
                                        <h3 class="text-center font-weight-light my-4">alerts severity</h3>
                                        ${error}
                                    </div>
                                </div>`
                            : html`                                
                                <div class="row justify-content-left">
                                    <div class="col-lg-5 card shadow-lg border-0 rounded-lg mt-5">
                                        <h3 class="text-center font-weight-light my-4">alerts severity</h3>
                                        <canvas id="myChart"></canvas>
                                    </div>
                                </div>
                            `
                        };
                    </div>
                </div>
            </div>
        </main>
        `;
    }
};


export { mainPage };