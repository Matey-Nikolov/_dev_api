import { html } from "../../Global/globalLit.js";

function alertError(typeError){ 
    return html`
        <div class="alert alert-danger" role="alert">
            ${typeError}
        </div>
    `;
};

export { alertError };