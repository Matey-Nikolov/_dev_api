import { setGlobal, apiHost } from './global.js';
import { render, tableTemplate } from '../GlobalImport/globalLit.js';
import { divApp } from '../GlobalImport/globalInport.js';
 
async function endpoints(){

  let url = new URL(`${apiHost}/endpoint/v1/endpoints`);

  url.searchParams.append('pageTotal', 'true'); 
  //url.searchParams.append('pageSize', '1'); 

  let endpoints = await fetch(url, setGlobal())
  .then(response => response.json())
  .catch(error => console.log('error', error));

  render(tableTemplate(endpoints), divApp);

  return endpoints;
}

export { endpoints };