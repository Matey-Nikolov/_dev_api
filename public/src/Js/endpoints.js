import { pagesTable } from './global.js';

let endpointsData = {
  'items': {},
  'pages': {}
};

let endpointsFilter = {
  'items': {},
  'pages': {}
};

async function endpoints(){
  const endpoints = await fetch('/endpoints')
  .then(response => response.json())
  .catch(error => console.log('error', error));

  endpointsData = endpoints;

  pagesTable();

  return endpointsData;
};

async function endpointsTypeServer(){
  endpointsFilter.items = endpointsData.items.filter(x => x.type === 'server');
  endpointsFilter.pages = endpointsData.pages;
  
  pagesTable();

  return endpointsFilter;
}

async function endpointsTypeComputer(){
  endpointsFilter.items = endpointsData.items.filter(x => x.type === 'computer');
  endpointsFilter.pages = endpointsData.pages;

  pagesTable();

  return endpointsFilter;
};

export { endpoints, endpointsTypeServer, endpointsTypeComputer };