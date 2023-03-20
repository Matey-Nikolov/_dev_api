import { html, css, LitElement } from '../GlobalImport/globalLit.js';

const loginTemplate = () =>{
    return html`
    <form>
        <p>Login page</p>
        <label for="uname"><b>Username</b></label>
        <p></p>
        <input id="username" type="text" placeholder="Enter Username" name="uname" required>

        <p></p>

        <label for="psw"><b>Password</b></label>
        <p></p>
        <input id="password" type="password" placeholder="Enter Password" name="psw" required>
        
        <p></p>

        <button id="loginBtn" type="submit" class="btn btn-outline-success">Login</button>
    </form>`;
};

export { loginTemplate };