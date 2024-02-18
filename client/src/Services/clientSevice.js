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
let getInfomation = [];

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
      getInfomation = await viewAlerts();
    break;
    case 'endpoints':
      getInfomation = await viewEndpoints();
    break;
  };

  return getInfomation;
};

const viewAlerts = async () =>{
  const alerts = await getAlersFromApi(tenantId);

  return alerts;
};

const viewEndpoints = async () =>{
  const endpoints = await fetchEndpoints(tenantId);
  return endpoints;
};

export { viewInfomation };