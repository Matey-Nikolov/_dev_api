import {db, collection, getDocs, doc } from '../firebase/firebase-config';
import SecureStorage from 'react-secure-storage';

import { getEndpoints, getEndpointDetails, endpointScan } from "../axiosrequests/apiEndpoint";

const fetchEndpoints = async (clientId) => {
  try {
    const endpoins = await getEndpoints(clientId);

    return endpoins;
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    throw error;
  }
};

const fetchEndpointDetails = async (machine_Id ) => {
  try {
    const endpoinDetails = await getEndpointDetails(machine_Id);
    
    return endpoinDetails;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};
  
const fetchEndpointScan = async (machine_Id) => {
  try {
    const returnStatus = await endpointScan(machine_Id);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

const setupClients = async () => {
  const clients = new Set();
  const id = SecureStorage.getItem('ref');

  const docRef = doc(db, 'User', id);
  const subCollectionRef = collection(docRef, 'accessClients');

  const querySnapshot = await getDocs(subCollectionRef);

  querySnapshot.forEach((doc) => {
    clients.add(doc.data());
  });

  return clients;
};


export { fetchEndpoints, fetchEndpointDetails, fetchEndpointScan, setupClients };