import { html } from "../../Global/globalLit.js";
import { endpointsRouter } from "../../Global/globalInport.js";

function tableEndpointsDetailsTemplate(nameMachine, machineDetailsAssignedProducts, machineDetailsHealth, machineDetails_Os){
    return html`
        <div class="container text-center mt-4">
            <h2 class="font-weight-light text-light">${nameMachine}</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-12">
                            <div class="card bg-dark shadow-2-strong mx-2 my-2">
                                <div class="card-body">
                                    <div id="assigned_Products" class="table-responsive">
                                        <h4 class="font-weight-light text-light">Assigned products</h4>
                                        <table class="table table-dark table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Code</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Version</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table-body">
                                                ${machineDetailsAssignedProducts.map((detailsAssignedProducts) => 
                                                    html`
                                                        <tr>
                                                            <td>${detailsAssignedProducts.code}</td>
                                                            <td>${detailsAssignedProducts.status}</td>
                                                            <td>${detailsAssignedProducts.version}</td>
                                                        </tr>
                                                    `
                                                )}
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
                    <div class="row">
                        <div class="col-12">
                            <div class="card bg-dark shadow-2-strong mx-2 my-2">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <h4 class="font-weight-light text-light">Os</h4>
                                        <table class="table table-dark table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Platform</th>
                                                    <th scope="col">Build</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table-body">
                                                ${machineDetails_Os.map((detailsOs) => 
                                                    html`
                                                        <tr>
                                                            <td>${detailsOs.name}</td>
                                                            <td>${detailsOs.platform}</td>
                                                            <td>${detailsOs.build}</td>
                                                        </tr>
                                                    `
                                                )}
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
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-12">
                            <div class="card bg-dark shadow-2-strong mx-2 my-2">
                                <div class="card-body">
                                    <div id="health_Check" class="table-responsive">
                                        <h4 class="font-weight-light text-light">Health check</h4>
                                        <table class="table table-dark table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table-body">
                                                ${machineDetailsHealth.map((detailsHealth) => 
                                                    html`
                                                        <tr>
                                                            <td>${detailsHealth.name}</td>
                                                            <td>${detailsHealth.status}</td>
                                                        </tr>
                                                    `
                                                )}
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
                    <div class="row">
                        <div class="col-12">
                            <div class="card bg-dark shadow-2-strong mx-2 my-2">
                                <div class="card-body">
                                    <button @click=${endpointsRouter} class="btn btn btn-info">Return to all endpoints</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

export { tableEndpointsDetailsTemplate };