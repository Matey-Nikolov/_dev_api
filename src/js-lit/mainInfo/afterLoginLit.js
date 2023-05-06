import { html } from '../../Global/globalLit.js';

const loginInfo = () =>{
    return html`
        <div class="container-fluid px-4">
            <div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                                    <p class="text-center font-weight-light my-4">
                                        How to start: click the who I'm to authorization.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export { loginInfo };