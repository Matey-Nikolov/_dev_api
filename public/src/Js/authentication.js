import { client_idDb, client_secretDb } from '../firebase/registerCreate.js';

class authenticationClass {
  async postToken() {
    const response = await fetch(`/token/:${client_idDb}/:${client_secretDb}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const accessToken = await response.json();

    return accessToken.token;
  };
};

export { authenticationClass }