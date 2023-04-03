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
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Tenant</th>
                                    <th>Product</th>
                                    <th>Severity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>
                                    ${alerts.items.map((value) => html`<tr>${value.tenant.name}</tr>
                                </td>`)}
                                <td>
                                    ${alerts.items.map((value) => html`<tr>${value.product}</tr>
                                </td>`)}
                                <td>
                                    ${alerts.items.map((value) => html`<tr>${value.severity}</tr>
                                </td>`)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    
}

export { tableAlertTemplate };