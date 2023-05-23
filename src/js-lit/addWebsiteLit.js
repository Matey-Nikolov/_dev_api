import { html } from "../Global/globalLit.js";

const addNewWebsite = () =>{
    return html`
    <div class="container-fluid px-4">
        <div>
        <main>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                        <div class="card-header"><h3 class="text-center font-weight-light my-4">Add website</h3></div>
                        <div class="card-body">
                            <form>
                                <div class="form-floating mb-3">
                                    <input id="website" class="form-control" type="text" placeholder="guest or admin" />
                                    <label for="website">website</label>
                                </div>
                                <div class="mt-4 mb-0">
                                    <div class="d-grid"><button id="allowWebsite" class="btn btn-primary btn-block">add website</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
        </div>
    </div>
    `;
}

export { addNewWebsite };