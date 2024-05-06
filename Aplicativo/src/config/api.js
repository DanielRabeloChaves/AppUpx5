import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from './baseUrl';

const api = axios.create({  
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  console.log(token)
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;