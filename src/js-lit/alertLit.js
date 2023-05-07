import { html } from "../Global/globalLit.js";
import { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter } from "../Global/globalInport.js";

//https://lit.dev/docs/templates/expressions/#removing-attribute
function tableAlertTemplate(alerts, error){

    // console.log(alerts);
    return html`
        <div class="container text-center">
            <div class="row no-gutters">
                <div class="col-2">
                    <div class="flex-shrink-0 p-3 bg-white">

                        <span class="fs-5 fw-semibold">Filters</span>
                        <ul class="list-unstyled ps-0">
                            <button @click=${alertRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                                All alerts
                            </button>

                            <li class="mb-1">

                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Severity
                                </button>
                                <div class="collapse show" id="home-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <!-- <li><button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">All</button></li> -->
                                    <li>
                                        <button @click=${alertLowRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Low</button>
                                    </li>
                                    <li>
                                        <button @click=${alertMediumRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Medium</button>
                                    </li>
                                    <li>
                                        <button @click=${alertHighRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">High</button>
                                    </li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-8">
                    ${error !== undefined ? html`
                            ${error}` : 
                        html`
                            <div class="container mt-5">
                                <h2>User - ${alerts.items[0].tenant.name}</h2>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Severity</th>
                                        <th>Description</th>
                                        <th>RaisedAt</th>
                                    </tr>
                                    </thead>
                                    <tbody id="table-body">
                                        ${alerts.items.map((value) => html`
                                            <tr>
                                                <td>${value.product}</td>
                                                <td>${value.severity}</td>
                                                <td>${value.description}</td>
                                                <td>${value.raisedAt}</td>
                                            </tr>`)}
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-center" id="pagination"></ul>
                                </nav>
                            </div>
                        `
                    }
                    </div>
                </div>
            </div>
        </div>
    `;
};

export { tableAlertTemplate };