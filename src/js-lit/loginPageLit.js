import { html } from '../Global/globalLit.js';

const loginTemplate = () =>{

    return html`
        <div class="container-fluid px-4">
            <div>
                <!-- <main> -->
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <form>
                                            <div class="form-floating mb-3">
                                                <input id="username" class="form-control" type="name" placeholder="Username..." />
                                                <label>Username</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input id="password" class="form-control" type="password" placeholder="Password..." />
                                                <label>Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button id="loginBtn" type="submit" class="btn btn-primary">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- </main> -->
            </div>
        </div>
    `;
};

export { loginTemplate };