import { html } from "../Global/globalLit.js";
import { handleButtonClickBlock } from "../Global/globalInport.js";
import { websiteAddRouter } from "../Global/globalInport.js"; 

function tableAllowWebsiteTemplate(webSite, error){
    // console.log(webSite);
    return html`
    <div class="container text-center">
        <div class="row no-gutters">
            <div class="col-2">
                <div class="flex-shrink-0 p-3 bg-white">
                    <ul class="list-unstyled ps-0">
                        <button @click=${websiteAddRouter} class="btn btn-success d-inline-flex align-items-center rounded border-0 collapsed">
                            Add website
                        </button>
                    </ul>
                </div>
            </div>
            <div class="col-8">
            ${error !== undefined ? html`
                ${error}`
                : html`
                    <div class="container mt-5">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Site</th>
                                        <th>Comment</th>
                                        <th>Block</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body" @click=${handleButtonClickBlock}>
                                    ${webSite.map((value) => html`
                                        <tr>
                                            <td><a href="https://${value.url}">${value.url}</a></td>
                                            <td>${value.comment}</td>
                                            <td><button data-type=${value.id} class="btn btn-outline-danger">block</button></td>
                                        </tr>`)}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation">
                                <ul class="pagination justify-content-center" id="pagination"></ul>
                            </nav>
                        </div> 
                    </div>
                `
            }    
            </div>
        </div>
    </div>`
};

export { tableAllowWebsiteTemplate };