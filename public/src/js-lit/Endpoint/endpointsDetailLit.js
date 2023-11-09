import { html } from "../../Global/globalLit.js";


function tableEndpointsDetailsTemplate(machineDetailsAssignedProducts, machineDetailsHealth){
    return html`
    <div class="container text-center">
        <div class="row no-gutters">
            <div class="col-8">
                <div class="container mt-3">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="card bg-dark shadow-2-strong">
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
                    </div>
                </div>
                <div class="container mt-3">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-10">
                                <div class="card bg-dark shadow-2-strong">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

export { tableEndpointsDetailsTemplate };