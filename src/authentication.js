let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Access-Control-Allow-Origin", "*");
let urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("scope", "token");
urlencoded.append("client_id", "");
urlencoded.append("client_secret", "");

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow',
  mode: 'no-cors'
};

async function  asd(){
  let data = await fetch("https://id.sophos.com/api/v2/oauth2/token", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  return data;
}




console.log(asd());