import { client_idDb, client_secretDb } from '../firebase/registerCreate.js';

class authenticationClass {
  async postToken() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

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

    const response = await fetch('https://id.sophos.com/api/v2/oauth2/token', requestOptions);
    const result = await response.json();
    const accessToken = result.access_token;

    // Use the token as needed
    // sessionStorage.setItem('token', accessToken);
    // whoIam();

    return accessToken;
  }
}

/*
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
//myHeaders.append("headers", { 'Content-type': 'application/json' });
//myHeaders.append("Access-Control-Allow-Origin", "*");

function postToken(){
  return post();
}

async function post(){

  // console.log(client_idDb);
  // console.log(client_secretDb);

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
    //mode: 'no-cors'
  };

  const response = await fetch('https://id.sophos.com/api/v2/oauth2/token', requestOptions);
  const result = await response.json();
  const accessToken = result.access_token;
    // sessionStorage.setItem('token', result.access_token);
    // whoIam();

  console.log(responseToken);

  return accessToken;
};
*/

export { authenticationClass }