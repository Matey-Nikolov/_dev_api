import { html } from '../Global/globalLit.js';

const loginTemplate = () =>{

    return html`
        <section class="vh-75">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-12 col-md-6 col-lg-4" style="margin-top: 10vh;">
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

/*

    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                <p class="text-white-50 mb-5">Please enter your username and password!</p>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label" for="text1">Username</label>
                                    <input id="username"  type="text1" class="form-control form-control-lg" />
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label" for="typePasswordX">Password</label>
                                    <input id="password" type="password" class="form-control form-control-lg" />
                                </div>

                                <button id="loginBtn" class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

/*

/*
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
*/