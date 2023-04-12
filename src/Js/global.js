let id;
let apiHost;

function authorization(idTenetGet, apiHostGet){
    id = idTenetGet;
    apiHost = apiHostGet;
    
    console.log(id, apiHost);
}

function setGlobal(){
    const myHeaders = new Headers();
    myHeaders.append('X-Tenant-ID', id);
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return requestOptions;
}

function pagesTable(){
  $(document).ready(function() {
      let tableBody = $('#table-body');
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
        let pagination = $('#pagination');
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
      }
    
      showPage(currentPage);
  });
}

export { setGlobal, authorization, id, apiHost, pagesTable }