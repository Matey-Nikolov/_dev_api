import Client from './clientClass';

import {db, collection, getDocs, doc } from '../../firebase/firebase-config';
import SecureStorage from 'react-secure-storage';

/** @type {Client[]} */
const clients = [];

/**
 * Setup clients.
 * @async
 * @returns {Promise<Client[]>} The clients.
 */
const setupClients = async () => {
  const id = SecureStorage.getItem('ref');

  const docRef = doc(db, 'User', id);
  const subCollectionRef = collection(docRef, 'accessClients');

  const querySnapshot = await getDocs(subCollectionRef);

  querySnapshot.forEach((doc) => {
    const clientData = doc.data();
    const existingClientIndex = clients.findIndex(client => 
      client.clientName === clientData.name
    );

    if (existingClientIndex === -1) {
      const newClient = new Client(clientData);
      clients.push(newClient);
    };
  });

  for (const client of clients) {
    await client.setupEnvironment();
  };

  return clients;
};

/**
 * Find a client by its ID.
 * @param {string} clientId - The ID of the client.
 * @returns {Client|number} The client if found, otherwise -1.
 */
const findClientById = (clientId) => {
  const client = clients.find(client => client.uniqueId === clientId);

  return client !== undefined ? client : -1;
};

export { setupClients, findClientById };