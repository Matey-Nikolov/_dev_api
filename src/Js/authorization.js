import { authorization } from './global.js'



async function whoIam(){

  let myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

    let responseData = await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
        authorization(result.id, result['apiHosts'].dataRegion);

    })
    .catch(error => console.log('error', error));

};


export { whoIam };