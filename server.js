import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path
const __dirname = path.dirname(__filename); // Derive the directory name

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://api.central.sophos.com/whoami/v1', 'https://api.central.sophos.com/whoami/v1'],
  methods: 'GET, PUT, POST, DELETE',
};

app.use(cors(corsOptions));

app.use(express.static('public'));

// Define routes for your SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Use path.join to construct the file path
});

app.get('/whoIam/:access', async (request, res) => {
  const access = request.params.access.replace(':', '');
  
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + access);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://api.central.sophos.com/whoami/v1`, requestOptions)
  const result = await response.json();

  res.json(result);
});

// Define an API route
app.get('/token/:client/:access', async (request, res) => {
  const client = request.params.client.replace(':', ''); // Remove ":" from client parameter
  const access = request.params.access.replace(':', ''); // Remove ":" from access parameter

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');
  urlencoded.append('scope', 'token');
  urlencoded.append('client_id', client);
  urlencoded.append('client_secret', access);


  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch('https://id.sophos.com/api/v2/oauth2/token', requestOptions);
  const result = await response.json();
  const accessToken = result.access_token;

  const data = { token: accessToken };
  res.json(data);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
