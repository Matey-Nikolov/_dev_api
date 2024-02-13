import axios from 'axios';

const baseURL = 'http://localhost:3000'; //process.env.REACT_APP_BASE_URL

const api = axios.create({
  baseURL
});

export { api };