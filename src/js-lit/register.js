import { html } from '../GlobalImport/globalLit.js';

const registerTemplate = () =>{
    return html`
    <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
        <h2 class="text-center mb-4 text-primary">Register</h2>
        <form>
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
    /*
    return html`
    <form>
        <p>Register</p>

        <label for="uname"><b>Username</b></label>
        <p></p>
        <input id="username" type="text" placeholder="Enter Username" name="uname" required>

        <p></p>
        <label for="psw"><b>Password</b></label>
        <p></p>
        <input id="password" type="password" placeholder="Enter Password" name="psw" required>
        
        <p></p>

        <button id="registerPage" type="submit" class="btn btn-outline-success">Register</button>
    </form>`;
    */
};

export { registerTemplate };