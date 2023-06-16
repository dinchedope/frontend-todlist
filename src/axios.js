import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://176.117.72.136:4000'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;