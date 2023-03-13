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

export { setGlobal, authorization, id, apiHost }