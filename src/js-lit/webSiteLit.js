import { html } from "../Global/globalLit.js";
import { handleButtonClick } from "../Global/globalInport.js";

function tableAllowWebsiteTemplate(events){
    return html`
        <div class="row no-gutters">
            <div class="col-2">
                <!-- Filter section -->
            </div>
            <div class="col-9">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Site</th>
                            <!-- <th>Group</th> -->
                            <th>Block</th>
                        </tr>
                        </thead>
                        <tbody id="table-body" @click=${handleButtonClick}>
                            ${events.items.map((value) => html`
                                <tr>
                                <td>${value.name}</td>
                                <td><button data-type=${value.name}} class="btn btn-outline-success">block</button></td>
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
}

export { tableAllowWebsiteTemplate };