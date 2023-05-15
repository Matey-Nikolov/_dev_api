import { authorization } from './global.js'
import { render, welcomePage, afterAuthorization } from '../Global/globalLit.js';
import { divApp } from '../controller/homeController.js';

async function whoIam(){
  let myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

    await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
        authorization(result.id, result['apiHosts'].dataRegion);
        render(welcomePage(afterAuthorization('You are authorized! You are authorized. This takes about an hour. Therefore, you are required to renew it every hour.')), divApp);
    })
    .catch(error => console.log('error', error));
};


export { whoIam };