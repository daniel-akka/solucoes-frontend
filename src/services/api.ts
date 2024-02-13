import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create(
    {
        baseURL: 'http://localhost:8080/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-Width, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'Content-Type': 'multipart/form-data',
        }
    }
);

export default api;