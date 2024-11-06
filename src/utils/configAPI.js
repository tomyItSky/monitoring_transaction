import axios from 'axios';

export const configAPI = axios.create({
  // baseURL: 'http://localhost:5002',
  baseURL: 'https://devapimonitoring.skyparking.online',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
