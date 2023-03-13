//import {LitElement, html} from 'lit';
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class SimpleNavBar extends LitElement {

    /*
    static styles = css`
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #dddddd;
        }
            
        li {
        float: left;
        }
            
        li button {
        display: block;
        padding: 8px;
        }`;
    */
    static properties = {
    name: {type: String},
    };

    constructor() {
        super();
        // this.name = 'Somebody';
    }

    Welcome(){
        return html`<p>This page is demo version!</p>`
    }

    buttonsTemplate(){
        return html`
        <ul>
            <li>
                <button id="new">Call</button>
            </li>
            <li>
                <button id="get">get</button>
            </li>
            <li>
                <button id="info">info user</button>
            </li>
            <li>
                <button id="alert">alerts</button>
            </li>
            <li>
                <button id="login">login</button>
            </li>
        </ul>`;
    }

    render() {
        return html`${this.buttonsTemplate()}
        ${this.Welcome()}`;
    }

    //!!!!
    createRenderRoot() {
        return this;
    }
}
customElements.define('nav-bar', SimpleNavBar);
