import Client from './clientClass';

import {db, collection, getDocs, doc } from '../../firebase/firebase-config';
import SecureStorage from 'react-secure-storage';


const clients = [];
const id = SecureStorage.getItem('ref');

const docRef = doc(db, 'User', id);
const subCollectionRef = collection(docRef, 'accessClients');

const setupClients = async () => {
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

const findClientById = (clientId) => {
  return clients.find(client => client.uniqueId === clientId);
};

export { setupClients, findClientById };