import { setupInformation } from '../axiosrequests/apiSetupInfo';
import { whoIAm } from '../axiosrequests/apiAuth';
import { postToken } from "../axiosrequests/apiToken";
import { getAlersFromApi } from "./alertService";
import { fetchEndpoints } from './endpointsService';

import {db, collection, getDocs, doc } from '../firebase/firebase-config';
import SecureStorage from 'react-secure-storage';

class Client {
  #clientInfo;
  #tenantId = '';
  #setupTimestamp;

  constructor(infoUserClient) {
    this.clientName = infoUserClient.name;
    this.#clientInfo = {
      'client_Id_Db': infoUserClient.client_id,
      'client_secret_Db': infoUserClient.client_secret
    };
    this.alerts = [];
    this.endpoints = [];
  };

  async setupEnvironment() {
    const currentTime = Date.now();
    if (this.#setupTimestamp && currentTime - this.#setupTimestamp < 50 * 60 * 1000) {
      return;
    };

    try {
      const setAuthToken = await postToken(this.#clientInfo);
      this.#tenantId = await whoIAm(setAuthToken);

      await setupInformation(setAuthToken, this.#tenantId);

      this.alerts = await this.getAlerts();
      this.endpoints = await this.getEndpoints();

      this.#setupTimestamp = currentTime;
    } catch (error) {
      console.error('Error:', error.message);
    };
  };

  async getAlerts() {
    return getAlersFromApi(this.#tenantId);
  };

  async getEndpoints() {
    return fetchEndpoints(this.#tenantId);
  };
};


const setupClients = async () => {
  const clients = [];
  const id = SecureStorage.getItem('ref');

  const docRef = doc(db, 'User', id);
  const subCollectionRef = collection(docRef, 'accessClients');

  const querySnapshot = await getDocs(subCollectionRef);

  querySnapshot.forEach((doc) => {
    const clientData = doc.data();

    const existingClientIndex = clients.findIndex(client => 
      client.clientInfo.client_Id_Db === clientData.client_id &&
      client.clientInfo.client_secret_Db === clientData.client_secret
    );

    if (existingClientIndex !== -1) {
      clients.push(clients[existingClientIndex]);
    } else {
      const newClient = new Client(clientData);
      clients.push(newClient);
    };
  });

  for (const client of clients) {
    await client.setupEnvironment();
  };

  return clients;
};

export { setupClients };
