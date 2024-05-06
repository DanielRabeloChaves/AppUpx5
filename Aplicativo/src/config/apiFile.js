import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from './baseUrl';

const apiFile = axios.create({  
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
  },
});

apiFile.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiFile;