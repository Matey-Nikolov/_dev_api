import { html } from "../Global/globalLit.js";
import { handleButtonClickAllow, eventAllRouter, eventWebsiteRouter } from "../Global/globalInport.js";

const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;

function tableEventTemplate(events, error){
    return html`
    <div class="container text-center">
        <div class="row no-gutters">
            <div class="col-2">
                <div class="flex-shrink-0 p-3 bg-white">
                    <span class="fs-5 fw-semibold">Filters</span>
                    <ul class="list-unstyled ps-0">
                        <button @click=${eventAllRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                            All events
                        </button>

                        <li class="mb-1">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                Type
                            </button>
                            <div class="collapse show" id="home-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <button @click=${eventWebsiteRouter} class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">websites</button>
                                </li>
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-9">
                ${error !== undefined ? html`
                    ${error}`
                    : html`
                        <div class="container mt-5">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-12">
                                        <div class="card bg-dark shadow-2-strong">
                                            <div class="card-body">
                                                <div class="table-responsive">

                                                    <table class="table table-dark table-borderless mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Messages</th>
                                                                <th scope="col">Allow</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="table-body" @click=${handleButtonClickAllow}>
                                                            ${events.items.map((value) => html`
                                                                <tr>
                                                                    <td>${value.name}</td>
                                                                    ${value.type.match(filterRegex)[2] === 'WebControlViolation' ? 
                                                                    html`
                                                                        <td><button data-type=${value.name}} class="btn btn-outline-success">allow</button></td>
                                                                    `
                                                                    : 
                                                                    html``}
                                                                </tr>`)
                                                            }
                                                        </tbody>

                                                        <nav aria-label="Page navigation">
                                                            <ul class="pagination justify-content-center" id="pagination"></ul>
                                                        </nav>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }                          
            </div>
        </div>
    </div>`;
};

/*

                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Messages</th>
                                        <th>Allow</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body" @click=${handleButtonClickAllow}>
                                    ${events.items.map((value) => html`
                                        <tr>
                                            <td>${value.name}</td>
                                            ${value.type.match(filterRegex)[2] === 'WebControlViolation' ? 
                                            html`
                                                <td><button data-type=${value.name}} class="btn btn-outline-success">allow</button></td>
                                            `
                                            : 
                                            html``}
                                        </tr>`)
                                    }
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation">
                                <ul class="pagination justify-content-center" id="pagination"></ul>
                            </nav>
                        </div>

*/

/*
                    

*/
export { tableEventTemplate };