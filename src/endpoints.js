import { setGlobal, apiHost } from './global.js';
  
async function endpoints(divApp){

  const userInfo = document.createElement('div');


  let url = new URL(`${apiHost}/endpoint/v1/endpoints`);

  //url.searchParams.append('pageTotal', 'true'); 
  //url.searchParams.append('pageSize', '1'); 

  let endpoints = await fetch(url, setGlobal())
  .then(response => response.json())
  .catch(error => console.log('error', error));

  console.log(endpoints);

  divApp.append(userInfo);
}

export { endpoints };