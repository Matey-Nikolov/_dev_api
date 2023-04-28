import { html } from '../../Global/globalLit.js';

const afterAuthorization = () =>{
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
                                    <p class="text-center font-weight-light my-4">
                                        You are authorized! You are authorized. This takes about an hour. 
                                        Therefore, you are required to renew it every hour.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `;
}

export { afterAuthorization };