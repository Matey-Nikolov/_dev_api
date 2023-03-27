import { html, css, LitElement } from '../GlobalImport/globalLit.js';

const loginTemplate = () =>{
    
    // https://frontendshape.com/post/bootstrap-v52-design-login-form-page
    return html`
    <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary" style="margin: auto;">
        <h2 class="text-center mb-4 text-primary">Login</h2>
        <form>
            <div class="mb-3">
                <label for="uname" class="form-label"><b>Username</b></label>
                <input id="username" type="text" placeholder="Enter Username" name="uname" required class="form-control border border-primary" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="psw" class="form-label"><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" name="psw" required class="form-control border border-primary">
            </div>
            <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
            <div class="d-grid">
                <button id="loginBtn" type="submit" class="btn btn-outline-success">Login</button>
            </div>
        </form>
        <!-- // Work??? -->
        <!-- <div class="mt-3">
            <p class="mb-0  text-center">Don't have an account? <a href="signup.html" class="text-primary fw-bold">Sign Up</a></p>
        </div> -->
    </div>
    `;
};

export { loginTemplate };