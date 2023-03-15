import { html } from '../GlobalImport/globalLit.js';

const loginTemplate = () =>{
    return html`
    <form>
        <p>Login page</p>
        <label for="uname"><b>Username</b></label>
        <input id="username" type="text" placeholder="Enter Username" name="uname" required>

        <label for="psw"><b>Password</b></label>
        <input id="password" type="password" placeholder="Enter Password" name="psw" required>
        
        <button id="loginBtn" type="submit">Login</button>
    </form>`;
};

export { loginTemplate };