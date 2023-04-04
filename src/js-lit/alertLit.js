import { html } from "../GlobalImport/globalLit.js";
import { filterLow, filterMedium, filterHigh } from "../GlobalImport/globalInport.js";

function tableAlertTemplate(alerts){

    console.log(alerts);


    return html`
        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">

                        <span class="fs-5 fw-semibold">Filters</span>
                        <ul class="list-unstyled ps-0">
                            <li class="mb-1">
                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Severity
                                </button>
                                <div class="collapse show" id="home-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <!-- <li><button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">All</button></li> -->
                                    <li>
                                        <button @click=${filterLow} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Low</button>
                                    </li>
                                    <li>
                                        <button @click=${filterMedium} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Medium</button>
                                    </li>
                                    <li>
                                        <button @click=${filterHigh} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">High</button>
                                    </li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col">
                    <div class="container mt-5">
                    <h1>Table with Pagination</h1>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Tenant</th>
                            <th>Product</th>
                            <th>Severity</th>
                            <th>RaisedAt</th>
                        </tr>
                        </thead>
                        <tbody id="table-body">
                            ${alerts.items.map((value) => html`
                                <tr>
                                <td>${value.tenant.name}</td>
                                <td>${value.product}</td>
                                <td>${value.severity}</td>
                                <td>${value.raisedAt}</td>
                                </tr>`)}
                            
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center" id="pagination"></ul>
                    </nav>
                    </div>
                </div>
            </div>
        </div>`;
    
}


/*
old table
<!-- <table class="table table-bordered">
    <thead>
        <tr>
            <th>Tenant</th>
            <th>Product</th>
            <th>Severity</th>
            <th>RaisedAt</th>
        </tr>
    </thead>
    <tbody>
        <td>${alerts.items.map((value) => html`<tr>${value.tenant.name}</tr></td>`)}
        <td>
            ${alerts.items.map((value) => html`<tr>${value.product}</tr>
        </td>`)}
        <td>
            ${alerts.items.map((value) => html`<tr>${value.severity}</tr>
        </td>`)}
        <td>
            ${alerts.items.map((value) => html`<tr>${value.raisedAt}</tr>
        </td>`)}
    </tbody>
</table> -->

*/

/*
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>
<tr>
    <td>Ira Parker</td>
    <td>Vivamus.molestie.dapibus@quisturpisvitae.edu</td>
    <td>1-584-906-8572</td>
    <td>Sep 15, 2015</td>
</tr>

*/

export { tableAlertTemplate };