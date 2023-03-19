import { authorization } from './global.js'

const myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let idTenet;
let apiHost;

async function whoIam(){
    await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
    .then(response => response.json())
    .then(result => {

        authorization(result.id, result['apiHosts'].dataRegion);

        //console.log(result);
        //console.log(idTenet);
    })
    .catch(error => console.log('error', error));

};


export {whoIam, idTenet, apiHost};