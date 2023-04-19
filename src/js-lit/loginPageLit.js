import { html, css, LitElement } from '../Global/globalLit.js';

/*
class loginTemplate extends LitElement {
  static styles = css`
  `;
  render() {
    return html`
        <div id="login" class="modal fade" role="dialog">
            <div class="modal-dialog">  
                <div class="modal-content">
                    <div class="modal-body">
                        <button data-dismiss="modal" class="close">&times;</button>
                        <h4>Login</h4>
                        <form>
                        <input type="text" name="username" class="username form-control" placeholder="Username"/>
                        <input type="password" name="password" class="password form-control" placeholder="password"/>
                        <input class="btn login" type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>  
        </div>`;
    }
}
*/
/*
const loginTemplate = () =>{

    return html`
    <div id="login" class="modal fade" role="dialog">
        <div class="modal-dialog">  
            <div class="modal-content">
                <div class="modal-body">
                    <button data-dismiss="modal" class="close">&times;</button>
                    <h4>Login</h4>
                    <form>
                    <input type="text" name="username" class="username form-control" placeholder="Username"/>
                    <input type="password" name="password" class="password form-control" placeholder="password"/>
                    <input class="btn login" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div>  
    </div>
    `;
};
*/
const loginTemplate = () =>{
    
    // https://frontendshape.com/post/bootstrap-v52-design-login-form-page
    return html`
    <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
        <h2 class="text-center mb-4 text-primary">Login</h2>
        <form>
            <div class="mb-3">
                <label for="uname" class="form-label"><b>Username</b></label>
                <input id="username" type="text" placeholder="Enter Username" name="uname" required class="form-control border border-primary" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="psw" class="form-label"><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" name="psw" required class="form-control border border-primary">
            </div>
            <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
            <div class="d-grid">
                <button id="loginBtn" type="submit" class="btn btn-outline-success">Login</button>
            </div>
        </form>
    </div>
    `;
};

export { loginTemplate };