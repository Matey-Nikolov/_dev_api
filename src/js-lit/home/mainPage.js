import { html } from '../../Global/globalLit.js';
import { btnLogin } from '../../Global/globalInport.js';

const mainPage = (data, role) =>{
    if (data === undefined && role !== 'admin' && role !== 'guest') {
        return html`
        <main id="main">
            <div class="container-fluid px-4">
                <div>
                    <!-- <main> -->
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-5">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header">
                                            <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                                            <h4 class="text-center font-weight-light my-4">To view all website, please <a @click=${btnLogin}><b>login</b></a></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- </main> -->
                </div>
            </div>
        </main>
        `;
    }else if(data !== undefined){ 
        return html`${data}`;
    }else if(role === 'admin' || role === 'guest'){
        return html`
        <main id="main">
            <div class="container-fluid px-4">
                <div>
                    <!-- <main> -->
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-5">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header">
                                            <h3 class="text-center font-weight-light my-4">Welcome to API center</h3>
                                            <p class="text-center font-weight-light my-4">
                                                How to start: click the who I'm to authorization.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- </main> -->
                </div>
            </div>
        </main>
        `;
    }
};

export { mainPage };