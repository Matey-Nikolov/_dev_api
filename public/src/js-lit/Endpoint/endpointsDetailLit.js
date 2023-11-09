import { html } from "../../Global/globalLit.js";


function tableEndpointsDetailsTemplate(endpoint){
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
                                        <div class="table-responsive">
                                            <h4 class="font-weight-light text-light">Assigned products ${}</h4>
                                            <table class="table table-dark table-borderless mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Code</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Health</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="table-body">
                                                    ${endpoint.map((assignedProducts) => 
                                                        html`
                                                            <tr>
                                                                <td>${assignedProducts.code}</td>
                                                                <td>${assignedProducts.status}</td>
                                                                <td>${assignedProducts.version}</td>
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

/*
<tr>
<td>${value.assignedProducts.code}</td>
<td>${value.assignedProducts.status}</td>s
<td>${value.assignedProducts.health.version}</td>
</tr>`

*/

export { tableEndpointsDetailsTemplate };