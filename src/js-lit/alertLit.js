import { html } from "../GlobalImport/globalLit.js";
import { filter } from "../GlobalImport/globalInport.js";

function tableAlertTemplate(alerts){

    console.log(alerts);


    return html`
        <div class="container text-center">
            <div class="row">
                <div class="col">
                <div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">
                    <p><b>Filters</b></p>
                    <ul class="list-unstyled ps-0">
                        <li class="mb-1">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Home page</button>
                            
                            <div class="collapse show" id="home-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <button @click=${filter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Filter</button>
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
                            <td>${alerts.items.map((value) => html`<tr>${value.tenant.name}</tr></td>`)}
                            <td>${alerts.items.map((value) => html`<tr>${value.product}</tr></td>`)}
                            <td>${alerts.items.map((value) => html`<tr>${value.severity}</tr></td>`)}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>`;
    
}

export { tableAlertTemplate };