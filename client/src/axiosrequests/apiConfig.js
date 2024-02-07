import axios from 'axios';
import secureStorage   from 'react-secure-storage';

const accessToken = secureStorage.getItem('tokenTenat');
const access_Id = secureStorage.getItem('tenetId');

const baseURL = 'http://localhost:3000'; //process.env.REACT_APP_BASE_URL

const api = axios.create({
  baseURL,
  params: {
    accessToken, 
    access_Id
  }

});

export { api };