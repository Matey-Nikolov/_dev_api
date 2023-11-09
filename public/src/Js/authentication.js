import { client_idDb, client_secretDb } from '../firebase/firebase_RegisterLogin.js';

class authenticationClass {
  async postToken() {
    const response = await fetch(`/data/token/:${client_idDb}/:${client_secretDb}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const accessToken = await response.json();

    return accessToken.token;
  };
};

export { authenticationClass }