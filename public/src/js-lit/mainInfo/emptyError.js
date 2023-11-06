import { html } from "../../Global/globalLit.js";

function emptyError(typeError){ 
    return html`
    <main id="main">
        <div class="container-fluid px-4">
            <div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">${typeError}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>`;
};

export { emptyError };