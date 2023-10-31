import { html } from '../Global/globalLit.js';

const loginTemplate = (error) =>{

    return html`
        <section>
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow-lg border-0 rounded-lg mt-5" style="border-radius: 1rem;">
                            <div class="card-body p-3 text-center">
                                <div class="mb-3 mt-2">

                                    <h2 class="font-weight-light text-uppercase">Login</h2>
                                    <p class="font-weight-light mb-3">Please enter your username and password!</p>

                                    <div class="font-weight-light">
                                        <label class="form-label" for="username">Username</label>
                                        <input id="username" type="text" class="form-control" />
                                    </div>

                                    <div class="font-weight-light">
                                        <label class="form-label" for="password">Password</label>
                                        <input id="password" type="password" class="form-control" />
                                    </div>

                                    <div class="mt-4 mb-0">
                                        <button id="loginBtn" class="btn btn-primary btn-block" type="submit">Login</button>
                                    </div>
                                
                                    ${error !== undefined ? html`
                                        
                                        <div class="mt-4 mb-0">
                                            ${error}
                                        </div>
                                        ` 
                                        : html``
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};

export { loginTemplate };