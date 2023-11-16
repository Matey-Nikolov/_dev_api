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
//https://www.banjocode.com/post/javascript/fetch-multiple-urls-same-time
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

  checkboxes.forEach((checkbox) =>{
    checkbox.addEventListener('change', updateButtonState);
  });

  submitButton.addEventListener('click', async () =>{

    let fromSetToArrayIds = [...urls];

    checkboxes.forEach((checkbox) =>{
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    });

    updateButtonState();

    const promises = fromSetToArrayIds.map(id => fetch(`/data/endpoints/scan/${id}`));
    await Promise.all(promises);

    urls.clear();
  });
};

const handleButtonClickSendScanRequest = (event) => {

  if (event.target.classList.contains('form-check-input')) {
    const endpointId = event.target.dataset.type;

    urls.add(endpointId);
  }
};

export { endpoints, endpointsTypeServer, endpointsTypeComputer, handleButtonClickShowDetails, ScanButton, handleButtonClickSendScanRequest };