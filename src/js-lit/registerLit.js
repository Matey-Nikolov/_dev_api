import { html } from '../Global/globalLit.js';

const registerTemplate = () =>{
return html`
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                                <div class="card-body">
                                    <form>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                    <label for="inputFirstName">First name</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                                    <label for="inputLastName">Last name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input id="role" class="form-control" type="text" placeholder="guest or admin" />
                                            <label for="role">Role</label>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="client_id" type="password" placeholder="Create a password" />
                                                    <label for="client_id">Client_id</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="client_secret" type="password" placeholder="Confirm password" />
                                                    <label for="client_secret">Client secret</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input id="password" class="form-control" type="password" placeholder="guest or admin" />
                                            <label for="password">Password</label>
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid"><button id="registerPage" class="btn btn-primary btn-block">Create Account</button></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
};

/*
const registerTemplate = () =>{
    return html`
    <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
        <h2 class="text-center mb-4 text-primary">Register</h2>
        <form>
            <div class="mb-3">
                <label for="uname" class="form-label"><b>Role</b></label>
                <!-- admin or guest -->
                <input id="role" type="text" placeholder="Enter role" required class="form-control border border-primary" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="uname" class="form-label"><b>Username</b></label>
                <input id="username" type="text" placeholder="Enter Username" name="uname" required class="form-control border border-primary" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="psw" class="form-label"><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" name="psw" required class="form-control border border-primary">
            </div>
            <div class="d-grid">
                <button id="registerPage" type="submit" class="btn btn-outline-success">register</button>
            </div>
        </form>
    </div>`;
};
*/
export { registerTemplate };