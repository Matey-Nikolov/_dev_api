let id;
let apiHost;
let access_token;
let websiteURL = '';

function authorization(idTenetGet, apiHostGet, token){

  if (idTenetGet === undefined && apiHostGet === undefined) {
    access_token = token;
  }else{
    id = idTenetGet;
    apiHost = apiHostGet;
    access_token = token;
  }
};

function setGlobal(){
  const myHeaders = new Headers();
  myHeaders.append('X-Tenant-ID', id);
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return requestOptions;
};

function getWebsiteAllow(URL){
  websiteURL = URL;
};

function setAllowPOST(valueURL){
  const myHeaders = new Headers();
  myHeaders.append('X-Tenant-ID', id);
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);
  
  const addLocalSite = 
  {
      tags: [
          "ALLOW"
      ],
      url: valueURL,
      comment: "Added by Matey"
  };

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify(addLocalSite)
  };

  return requestOptions;
};

function setDelete(){
  const myHeaders = new Headers();
  myHeaders.append('X-Tenant-ID', id);
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
  };

  return requestOptions;
}

function setGlobalPOST(){
  const myHeaders = new Headers();

  myHeaders.append('X-Tenant-ID', id);
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify({})
  };

  return requestOptions;
};

function pagesTable(tableId){
  $(document).ready(function() {
    let tableBody = $('#' + tableId + ' #table-body');
    //let tableBody = $('#table-body');
    let rowsPerPage = 5; // 10
    let currentPage = 1;
    let totalRows = tableBody.find('tr').length;
    let totalPages = Math.ceil(totalRows / rowsPerPage);
  
    function showPage(page) {
      currentPage = page;
      tableBody.find('tr').hide();
      let start = (currentPage - 1) * rowsPerPage;
      let end = start + rowsPerPage;
      tableBody.find('tr').slice(start, end).show();
      renderPagination();
    }
  
    function renderPagination() {
      let pagination = $('#' + tableId + ' #pagination');
      pagination.empty();
      for (let i = 1; i <= totalPages; i++) {
        let li = $('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
        if (i === currentPage) {
          li.addClass('active');
        }
        li.on('click', function() {
          showPage(parseInt($(this).text()));
        });
        pagination.append(li);
      }
    };
  
    showPage(currentPage);
  });
};

export { setGlobal, authorization, pagesTable, setDelete, setAllowPOST, setGlobalPOST };
export { getWebsiteAllow };
export { id, apiHost, access_token, websiteURL };