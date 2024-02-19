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

export { fetchEndpoints, fetchEndpointDetails, fetchEndpointScan };
