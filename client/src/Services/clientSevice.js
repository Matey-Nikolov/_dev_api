import { setupInformation } from '../axiosrequests/apiSetupInfo';
import { whoIAm } from '../axiosrequests/apiAuth';
import { postToken } from "../axiosrequests/apiToken";
import { getAlersFromApi } from "./alertService";
import { fetchEndpoints } from './endpointsService';
/*
    this.infoUser = 
    {
      'client_Id_Db' : '',
      'client_secret_Db': ''
    };
*/
let tenantId = '';

const setupClientEnvironment = async (infoUserClient) =>{
    let infoClient = 
    {
      'client_Id_Db' : infoUserClient.client_id,
      'client_secret_Db': infoUserClient.client_secret
    }; 

    try {
      const setAuthToken = await postToken(infoClient);
      
      tenantId = await whoIAm(setAuthToken);

      await setupInformation(setAuthToken, tenantId);

    } catch (error) {
      console.error('Error:', error.message);
    };
};

const viewInfomation = async (key, infomation) =>{
  await setupClientEnvironment(infomation);

  switch(key){
    case 'alerts':
      viewAlerts();
    break;
    case 'endpoints':
      viewEndpoints();
    break;
  };
};

const viewAlerts = async () =>{
  const alerts = await getAlersFromApi(tenantId);

  console.log(alerts);
};

const viewEndpoints = async () =>{
  const endpoints = await fetchEndpoints(tenantId);

  console.log(endpoints);
};

export { viewInfomation };