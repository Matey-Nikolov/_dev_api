import { html } from "../GlobalImport/globalLit.js";


function tableAlertTemplate(alerts){

    console.log(alerts);

    return html`
        <table class="table-secondary">
            <thead>
                <tr>
                    <th>type</th>
                    <th>health</th>
                    <th>lastSeenAt</th>
                </tr>
            </thead>
            <tbody>
                <td>${alerts.items.map((value) => html`<tr>${value.tenant.name}</tr></td>`)}
                    <td>${alerts.items.map((value) => html`<tr>${value.product}</tr></td>`)}
                    <td>${alerts.items.map((value) => html`<tr>${value.severity}</tr></td>`)}
            </tbody>
        </table>
        `;
    
}

export { tableAlertTemplate };