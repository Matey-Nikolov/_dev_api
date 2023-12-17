import { html } from "../../Global/globalLit.js";

function alertInfo(infoText){ 
    return html`
        <div class="alert alert-info">
            ${infoText}
        </div>
    `;
};

export { alertInfo };