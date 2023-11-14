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

  return endpointsData;
};

async function endpointsTypeServer(){
  endpointsFilter.items = endpointsData.items.filter(x => x.type === 'server');
  endpointsFilter.pages = endpointsData.pages;
  
  return endpointsFilter;
}

async function endpointsTypeComputer(){
  endpointsFilter.items = endpointsData.items.filter(x => x.type === 'computer');
  endpointsFilter.pages = endpointsData.pages;

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

/////////////////////////////////In progress//////////////////////////////////////////////

function ScanButton(buttonId) {
  let checkboxes = document.querySelectorAll('.form-check-input');
  let submitButton = document.getElementById(`${buttonId}`);

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateButtonState);
  });

  function updateButtonState() {
    let atLeastOneChecked = Array
    .from(checkboxes)
    .some(function (checkbox) {
      return checkbox.checked;
    });

    submitButton.disabled = !atLeastOneChecked;
  };
};


const handleButtonClickSendScanRequest = (event) => {

  if (event.target.classList.contains('form-check-input')) {
    const id = event.target.dataset.type;

    console.log(id);
  }
};






export { endpoints, endpointsTypeServer, endpointsTypeComputer, handleButtonClickShowDetails, ScanButton, handleButtonClickSendScanRequest };