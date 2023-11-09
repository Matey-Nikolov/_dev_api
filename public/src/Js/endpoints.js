import { pagesTable } from './global.js';

import { endpointMachineDetails } from './endpointsDetails.js';

let endpointsData = {
  'items': {},
  'pages': {}
};

let endpointsFilter = {
  'items': {},
  'pages': {}
};

async function endpoints(){
  const endpoints = await fetch('/data/endpoints')
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

const handleButtonClickShowDetails = (event) => {

  if (event.target.classList.contains('btn-info')) {
    const id = event.target.dataset.type;

    btnDetails(id);
  }
};

const btnDetails = async (id) =>{  
  const endpointDetails = await fetch(`/data/endpoints/details/${id}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error => console.log('error', error));

  endpointMachineDetails(endpointDetails);
};

export { endpoints, endpointsTypeServer, endpointsTypeComputer, handleButtonClickShowDetails };