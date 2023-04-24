import { whoIam } from './authorization.js';
import { client_idDb, client_secretDb } from '../firebase/registerCreate.js';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
//myHeaders.append("headers", { 'Content-type': 'application/json' });
//myHeaders.append("Access-Control-Allow-Origin", "*");

/*
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
*/
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

  const response = await fetch(`https://id.sophos.com/api/v2/oauth2/token`, requestOptions)
  .then(response =>  response.json())
  .then(result =>{
    sessionStorage.setItem('token', result.access_token);
    whoIam();
  });
};


export { post };