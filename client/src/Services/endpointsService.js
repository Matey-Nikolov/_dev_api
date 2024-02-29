import { getEndpoints, getEndpointDetails, endpointScanRequest, endpointUpdateRequest, endpointSoftware } from "../axiosrequests/apiEndpoint";
import { findClientById } from "./clientServiceFolder/clientSevice";

const fetchEndpoints = async (clientId) => {
  try {
    const endpoins = await getEndpoints(clientId);

    return endpoins;
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    throw error;
  }
};

const fetchEndpointDetails = async (machine_Id, clientId) => {
  try {
    const endpoinDetails = await getEndpointDetails(machine_Id, clientId);
    
    return endpoinDetails;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};
  
const postEndpointScan = async (machine_Id, clientId) => {
  try {
    const returnStatus = await endpointScanRequest(machine_Id, clientId);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

const postUpdateRequest = async (machine_Id, clientId) => {
  try {
    const returnStatus = await endpointUpdateRequest(machine_Id, clientId);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

const getSoftwareCurrentClient = async (clientId) =>{
  const getSoftware = await endpointSoftware(clientId);

  return getSoftware;
};

const searchEndpoints = (endpoints, searchTerm) => {
  return endpoints.filter(
    (value) => {
      let tamperProtectionStatus = value.tamperProtectionEnabled ? 'on' : 'off';
      
      return value.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.os.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.health.overall.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.health.services.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.lastSeenAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tamperProtectionStatus.includes(searchTerm.toLowerCase());
    }
  );  
};

const findClientendpoints = (currentClient_id) =>{
  const client = findClientById(currentClient_id);

  if (client !== -1) {
    return client.endpoints;
  };

  return [];
};

export { fetchEndpoints, fetchEndpointDetails, postEndpointScan, postUpdateRequest, getSoftwareCurrentClient, searchEndpoints, findClientendpoints };