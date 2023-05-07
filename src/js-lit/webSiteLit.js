import { html } from "../Global/globalLit.js";
import { handleButtonClickBlock } from "../Global/globalInport.js";

function tableAllowWebsiteTemplate(webSite){
    console.log(webSite);
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
                        <tbody id="table-body" @click=${handleButtonClickBlock}>
                            ${webSite.map((value) => html`
                                <tr>
                                    <td><a href="https://${value}">${value}</a></td>
                                    <td><button data-type=${value} class="btn btn-outline-danger">block</button></td>
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