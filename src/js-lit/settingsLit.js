import { html } from '../../Global/globalLit.js';

const aettings = () =>{
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
                                        You have access to alerts, endpoints and events.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-left">
                            <div class="col-lg-5 card shadow-lg border-0 rounded-lg mt-5">
                                <h3 class="text-center font-weight-light my-4">alerts severity</h3>
                                <canvas id="myChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>`
};


export { aettings };