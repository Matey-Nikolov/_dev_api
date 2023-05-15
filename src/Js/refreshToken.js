import { client_idDb, client_secretDb } from '../firebase/registerCreate.js';
import { render, welcomePage, afterAuthorization } from '../Global/globalLit.js';
import { divApp } from '../controller/homeController.js';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

async function refresh(){

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('scope', 'token');
    urlencoded.append('client_id', client_idDb);
    urlencoded.append('client_secret', client_secretDb);
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
  
    await fetch(`https://id.sophos.com/api/v2/oauth2/token`, requestOptions)
    .then(response =>  response.json())
    .then(result =>{
      sessionStorage.setItem('token', result.access_token);
      render(welcomePage(afterAuthorization('You renewed your token.')), divApp);
    });
};

export { refresh };