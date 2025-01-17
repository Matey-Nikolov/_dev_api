import { db, doc, collection, getDocs } from './firebase-config.js';
import Client from '../server/setUpClientsData/clientClass.js';

const COLLECTION = process.env.FIREBASE_COLLECTION;
const SUBCOLLECTION = process.env.FIREBASE_SUB_COLLECTION;

const clients = [];

const setupClients =  async (ID) =>{
  const docRef = doc(db, COLLECTION, ID);

  const subCollectionRef = collection(docRef, SUBCOLLECTION);

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

  return clients;
};

export default setupClients;