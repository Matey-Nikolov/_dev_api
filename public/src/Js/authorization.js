import { authorization } from './global.js'
import { render, welcomePage, afterAuthorization } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

async function whoIam(newAccess_token){
  const response = await fetch(`/whoIam/:${newAccess_token}`);

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  const result = await response.json();

  authorization(result.id, result['apiHosts'].dataRegion, newAccess_token);
  render(welcomePage(afterAuthorization('You are authorized. This takes about an hour. Therefore, you are required to renew it every hour.')), divApp);
};

export { whoIam };