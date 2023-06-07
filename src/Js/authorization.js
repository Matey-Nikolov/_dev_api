import { authorization } from './global.js'
import { render, welcomePage, afterAuthorization } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

async function whoIam(newAccess_token){
  let myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + newAccess_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
  .then(response => response.json())
  .then(result => {
    authorization(result.id, result['apiHosts'].dataRegion, newAccess_token);
    render(welcomePage(afterAuthorization('You are authorized. This takes about an hour. Therefore, you are required to renew it every hour.')), divApp);
  })
  .catch(error => console.log('error', error));
};

export { whoIam };