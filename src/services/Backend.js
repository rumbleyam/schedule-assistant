import axios from 'axios';
import Config from './Config';

axios.defaults.baseURL = Config.baseUrl;

export async function login({ username, password }) {
  const response = axios.post('/auth/local', {
    identifier: username,
    password,
  });

  return response;
}

export function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
