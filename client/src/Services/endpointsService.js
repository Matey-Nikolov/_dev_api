import { getEndpoints, getEndpointDetails, endpointScan } from "../axiosrequests/apiEndpoint";

const fetchEndpoints = async (dataAccess) => {
  try {
    const endpoins = await getEndpoints(dataAccess.tokenTenat, dataAccess.tenetId);

    return endpoins;
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    throw error;
  }
};

const fetchEndpointDetails = async (dataAccess, machine_Id ) => {
  try {
    const endpoinDetails = await getEndpointDetails(dataAccess.tokenTenat, dataAccess.tenetId, machine_Id);
    
    return endpoinDetails;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};
  
const fetchEndpointScan = async (dataAccess, machine_Id) => {
  try {
    const returnStatus = await endpointScan(dataAccess.tokenTenat, dataAccess.tenetId, machine_Id);
    
    return returnStatus;
  } catch (error) {
    console.error('Error fetching endpoint details:', error);
    throw error;
  }
};

export { fetchEndpoints, fetchEndpointDetails, fetchEndpointScan };
  