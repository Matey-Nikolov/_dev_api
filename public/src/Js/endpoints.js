import { pagesTable } from './global.js';

async function endpoints(){
  const endpoints = await fetch('/endpoints')
  .then(response => response.json())
  .catch(error => console.log('error', error));

  pagesTable();

  return endpoints;
};

export { endpoints };