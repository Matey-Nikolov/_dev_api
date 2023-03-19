import { html } from "../GlobalImport/globalLit.js";


function tableTemplate(endpoints){

    return html`
        <table>
            <thead>
                <tr>
                    <th>type</th>
                    <th>health</th>
                    <th>lastSeenAt</th>
                </tr>
            </thead>
            <tbody>
                    <td>${endpoints.items.map((value) => html`<tr>${value.type}</tr></td>`)}
                    <td>${endpoints.items.map((value) => html`<tr>${value.health.overall}</tr></td>`)}
                    <td>${endpoints.items.map((value) => html`<tr>${value.lastSeenAt}</tr></td>`)}
            </tbody>
        </table>
        `;
    
}

export { tableTemplate };