import { html } from '../GlobalImport/globalLit.js';

const registerTemplate = () =>{
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

        <button id="registerPage" type="submit">Register</button>
    </form>`;
};

export { registerTemplate };