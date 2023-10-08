import { html } from "../Global/globalLit.js";


function tableEndpointsTemplate(endpoints){

    // console.log(endpoints); @click=${}

    return html`
    <div class="container text-center">
        <div class="container text-center">
            <div class="row no-gutters">
                <div class="col-2">
                    <div class="flex-shrink-0 p-3 bg-white">
                        <span class="fs-5 fw-semibold">Filters</span>
                        <ul class="list-unstyled ps-0">
                            <li class="mb-1">
                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Type
                                </button>
                                <div class="collapse show" id="home-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <button  class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                        computer
                                        </button>
                                        <button  class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                        server
                                        </button>
                                    </li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-8">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name machine</th>
                                    <th>Type</th>
                                    <th>Health</th>
                                    <th>LastSeenAt</th>
                                </tr>
                            </thead>
                            <tbody id="table-body">
                                ${endpoints.items.map((value) => html`
                                    <tr>
                                        <td>${value.associatedPerson.name}</td>
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
        </div>
    </div>`
};

export { tableEndpointsTemplate };