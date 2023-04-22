import { html } from "../Global/globalLit.js";


function tableEndpointsTemplate(endpoints){

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
                                <button  class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Filter</button>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
            <div class="col">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Health</th>
                        <th>LastSeenAt</th>
                    </tr>
                    </thead>
                    <tbody id="table-body">
                        ${endpoints.items.map((value) => html`
                            <tr>
                            <td>${value.type}</td>
                            <td>${value.health.overall}</td>
                            <td>${value.lastSeenAt}</td>
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

export { tableEndpointsTemplate };