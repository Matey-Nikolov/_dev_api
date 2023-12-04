import { client_idDb, client_secretDb } from '../firebase/firebase_RegisterLogin.js';

export class AuthenticationClass {
  static instance;

  constructor() {
    this.accessToken = '';
    this.tokenExpirationTime = null;
  };

  static getInstance() {
    if (!AuthenticationClass.instance) {
      AuthenticationClass.instance = new AuthenticationClass();
    }

    return AuthenticationClass.instance;
  };

  async postToken() {

    // if (this.accessToken !== undefined && this.tokenExpirationTime > Date.now()) {
    //   console.log('Work (from cache)');
    //   return this.accessToken;
    // }

    const response = await fetch(`/data/token/:${client_idDb}/:${client_secretDb}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const accessToken = await response.json();

    this.accessToken = accessToken.token;
    this.tokenExpirationTime = Date.now() + 3600 * 1000;

    return this.accessToken;
  };


  async refreshAccessToken() {
    const response = await fetch(`/data/token/:${client_idDb}/:${client_secretDb}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const accessToken = await response.json();

    this.accessToken = accessToken.token;
    this.tokenExpirationTime = Date.now() + 3600 * 1000;

    return this.accessToken;
  };
};