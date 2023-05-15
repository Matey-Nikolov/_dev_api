import { html } from '../../Global/globalLit.js';

const afterAuthorization = (text) =>{
    return html`
    <div class="container-fluid px-4">
        <div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5 card shadow-lg border-0 rounded-lg mt-5">
                        <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                        <p class="text-center font-weight-light my-4">
                            ${text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export { afterAuthorization };