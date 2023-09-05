import axios from 'axios';

const api = axios.create({
  baseURL: 'YOUR_BACKEND_API_BASE_URL',
});

export default api;
