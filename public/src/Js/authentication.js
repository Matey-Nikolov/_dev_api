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

  async postToken(client_Id_Db, client_secret_Db) {
    const response = await fetch(`/data/token/:${client_Id_Db}/:${client_secret_Db}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const accessToken = await response.json();

    this.accessToken = accessToken.token;
    this.tokenExpirationTime = Date.now() + 3600 * 1000;

    return this.accessToken;
  };


  async refreshAccessToken(client_Id_Db, client_secret_Db) {
    const response = await fetch(`/data/token/:${client_Id_Db}/:${client_secret_Db}`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const accessToken = await response.json();

    this.accessToken = accessToken.token;
    this.tokenExpirationTime = Date.now() + 3600 * 1000;

    return this.accessToken;
  };
};