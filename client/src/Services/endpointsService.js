import { getEndpoints, getEndpointDetails, endpointScanRequest, endpointUpdateRequest, endpointSoftware } from "../axiosrequests/apiEndpoint";
import { findClientById } from "./clientServiceFolder/clientSevice";

/**
 * Fetches the endpoints for a given client ID.
 * @param {string} clientId - The client ID.
 * @returns {Promise<Array>} The endpoints.
 */
const fetchEndpoints = async (clientId) => {
  try {
    const endpoins = await getEndpoints(clientId);

    return endpoins;
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    throw error;
  }
};

/**
 * Fetches the details of an endpoint for a given machine ID and client ID.
 * @param {string} machine_Id - The machine ID.
 * @param {string} clientId - The client ID.
 * @returns {Promise<Object>} The endpoint details.
 */
const fetchEndpointDetails = async (machine_Id, clientId) => {
  try {
    const endpoinDetails = await getEndpointDetails(machine_Id, clientId);
    
    return endpoinDetails;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

/**
 * Sends a scan request for an endpoint for a given machine ID and client ID.
 * @param {string} machine_Id - The machine ID.
 * @param {string} clientId - The client ID.
 * @returns {Promise<Object>} The status of the scan request.
 */
const postEndpointScan = async (machine_Id, clientId) => {
  try {
    const returnStatus = await endpointScanRequest(machine_Id, clientId);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

/**
 * Sends an update request for an endpoint for a given machine ID and client ID.
 * @param {string} machine_Id - The machine ID.
 * @param {string} clientId - The client ID.
 * @returns {Promise<Object>} The status of the update request.
 */
const postUpdateRequest = async (machine_Id, clientId) => {
  try {
    const returnStatus = await endpointUpdateRequest(machine_Id, clientId);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

/**
 * Gets the software for the current client.
 * @param {string} clientId - The client ID.
 * @returns {Promise<Array>} The software.
 */
const getSoftwareCurrentClient = async (clientId) =>{
  const getSoftware = await endpointSoftware(clientId);

  return getSoftware;
};

/**
 * Searches the endpoints for a given search term.
 * @param {Array} endpoints - The endpoints.
 * @param {string} searchTerm - The search term.
 * @returns {Array} The matching endpoints.
 */
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

/**
 * Finds the endpoints for a given client ID.
 * @param {string} currentClient_id - The current client ID.
 * @returns {Array} The endpoints.
 */
const findCliEntendpoints = (currentClient_id) =>{
  const client = findClientById(currentClient_id);

  if (client !== -1) {
    return client.endpoints;
  };

  return [];
};

export { fetchEndpoints, fetchEndpointDetails, postEndpointScan, postUpdateRequest, getSoftwareCurrentClient, searchEndpoints, findCliEntendpoints };