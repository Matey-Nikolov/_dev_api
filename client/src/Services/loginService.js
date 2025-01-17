import { encryptData } from './cryptoService'

import { loginInApp, findUserInDatabase } from '../axiosrequests/apiLoginRequest/apiLogin'

class AuthLogin {
  constructor(email, password) {
    this.information = {
      email: email,
      password: password
    };

    this.accessToken = '';

    this.clients = { };
  };

  async signIn() {
    const encryptedPayload = encryptData(this.information);

    this.information = encryptedPayload;

    const isLogin = await loginInApp(encryptedPayload); 

    if (isLogin.success) {
      this.accessToken = isLogin.accessToken;
    };

    return this.accessToken;
  };

  async findUserByEmail(userEmail) {
    const encryptedPayload = encryptData(userEmail);
    
    await findUserInDatabase(encryptedPayload); 
  };
};

export { AuthLogin };