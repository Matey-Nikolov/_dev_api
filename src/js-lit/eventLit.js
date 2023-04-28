import { html } from "../Global/globalLit.js";
import { handleButtonClick } from "../Global/globalInport.js";

function tableEventTemplate(events){
    return html`
        <div class="row no-gutters">
            <div class="col-2">
                <div class="flex-shrink-0 p-3 bg-white">
                    <p><b>Filters</b></p>
                    <ul class="list-unstyled ps-0">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                            All events
                        </button>

                        <li class="mb-1">

                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                Type
                            </button>
                            <div class="collapse show" id="home-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                        Endpoint
                                    </button>
                                </li>
                                <li>
                                    <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                        Firewall
                                    </button>
                                </li>
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-9">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Messages</th>
                            <!-- <th>Group</th> -->
                            <th>Allow</th>
                        </tr>
                        </thead>
                        <tbody id="table-body" @click=${handleButtonClick}>
                            ${events.items.map((value) => html`
                                <tr>
                                <td>${value.name}</td>
                                <td><button data-type=${value.name}} class="btn btn-outline-success">allow</button></td>
                                </tr>`)}
                            
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center" id="pagination"></ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
    /*
    return html`
    <div class="container text-center">
        <div class="row">
            <div class="col">
            <div class="flex-shrink-0 p-3 bg-white" style="width: 100px;">
                <p><b>Filters</b></p>
                <ul class="list-unstyled ps-0">
                    <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                        All events
                    </button>

                    <li class="mb-1">

                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            Type
                        </button>
                        <div class="collapse show" id="home-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Endpoint
                                </button>
                            </li>
                            <li>
                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Firewall
                                </button>
                            </li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
            <div class="col" style="width: 400px;">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Messages</th>
                            <!-- <th>Group</th> -->
                            <th>Allow</th>
                        </tr>
                        </thead>
                        <tbody id="table-body" @click=${handleButtonClick}>
                            ${events.items.map((value) => html`
                                <tr>
                                <td>${value.name}</td>
                                <td><button data-type=${value.name}} class="btn btn-outline-success">allow</button></td>
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
    */
}

export { tableEventTemplate };