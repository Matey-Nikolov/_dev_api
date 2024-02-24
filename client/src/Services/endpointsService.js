import { getEndpoints, getEndpointDetails, endpointScanRequest, endpointUpdateRequest, endpointSoftware } from "../axiosrequests/apiEndpoint";

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

export { fetchEndpoints, fetchEndpointDetails, postEndpointScan, postUpdateRequest, getSoftwareCurrentClient };
