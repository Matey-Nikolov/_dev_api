import { endpointMachineDetails } from './endpointsDetails.js';

let endpointsData = {
  'items': {},
  'pages': {}
};

let endpointsFilter = {
  'items': {},
  'pages': {}
};

let urls = new Set(); 

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
  
  urls.clear();

  return endpointsFilter;
}

async function endpointsTypeComputer(){
  endpointsFilter.items = endpointsData.items.filter(x => x.type === 'computer');
  endpointsFilter.pages = endpointsData.pages;

  urls.clear();

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
let checkboxes;
let submitButton;

function updateButtonState() {
  let atLeastOneChecked = Array
  .from(checkboxes)
  .some(function (checkbox) {
    return checkbox.checked;
  });

  submitButton.disabled = !atLeastOneChecked;

  if(!atLeastOneChecked){
    urls.clear();
  };
};

function ScanButton(buttonId) {
  checkboxes = document.querySelectorAll('.form-check-input');
  submitButton = document.getElementById(`${buttonId}`);

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateButtonState);
  });

  submitButton.addEventListener('click', () =>{
    console.log(urls);
    
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });

    urls.clear();
    updateButtonState(); 
  });
};

const handleButtonClickSendScanRequest = (event) => {

  if (event.target.classList.contains('form-check-input')) {
    const endpointId = event.target.dataset.type;

    urls.add(`https://api-{dataRegion}.central.sophos.com/endpoint/v1/endpoints/:${endpointId}/scans`);
  }
};






export { endpoints, endpointsTypeServer, endpointsTypeComputer, handleButtonClickShowDetails, ScanButton, handleButtonClickSendScanRequest };