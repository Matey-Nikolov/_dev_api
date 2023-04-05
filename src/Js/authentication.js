const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
//myHeaders.append("headers", { 'Content-type': 'application/json' });
//myHeaders.append("Access-Control-Allow-Origin", "*");

const urlencoded = new URLSearchParams();
urlencoded.append('grant_type', 'client_credentials');
urlencoded.append('scope', 'token');
urlencoded.append('client_id', 'a2138bab-da32-4e8c-b0bd-b09ca12c5b84');
urlencoded.append('client_secret', '01163bdd52cd0861150e0d0183e6d157fec15cc9508af9cbc95ae53b1ce091ab5a03d132dec1efbc7706c0e83248cf342361');

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow',
  //mode: 'no-cors'
};


async function post(){
  const response = await fetch(`https://id.sophos.com/api/v2/oauth2/token`, requestOptions)
  .then(response =>  response.json())
  .then(result =>{
    sessionStorage.setItem('token', result.access_token);
  });
};


export { post };