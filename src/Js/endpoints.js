import { setGlobal, apiHost, pagesTable } from './global.js';

async function endpoints(){
  let url = new URL(`${apiHost}/endpoint/v1/endpoints`);

  url.searchParams.append('pageTotal', 'true'); 
  //url.searchParams.append('pageSize', '1'); 

  let endpoints = await fetch(url, setGlobal())
  .then(response => response.json())
  .catch(error => console.log('error', error));

  pagesTable();

  return endpoints;
};

export { endpoints };