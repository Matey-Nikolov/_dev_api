//import {LitElement, html} from 'lit';
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class SimpleLogin extends LitElement {

    static properties = {
    name: {type: String},
    };

    constructor() {
        super();
        // this.name = 'Somebody';
    }


    loginTemplate(){
        return html`
        <form>
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required>
    
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>
            
            <button type="submit">Login</button>
        </form>`;
    }

    render() {
        return html`${this.loginTemplate()}`;
    }

    //!!!!
    createRenderRoot() {
        return this;
    }
}
