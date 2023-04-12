import { setGlobal, apiHost, pagesTable } from './global.js';
import { render, tableTemplate } from '../Global/globalLit.js';
import { divApp } from '../Global/globalInport.js';

async function endpoints(){


  let url = new URL(`${apiHost}/endpoint/v1/endpoints`);

  url.searchParams.append('pageTotal', 'true'); 
  //url.searchParams.append('pageSize', '1'); 

  let endpoints = await fetch(url, setGlobal())
  .then(response => response.json())
  .catch(error => console.log('error', error));

  render(tableTemplate(endpoints), divApp);

  pagesTable();

  return endpoints;
}

export { endpoints };