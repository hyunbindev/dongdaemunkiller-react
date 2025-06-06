import axios from 'axios';

const api =  axios.create({
    timeout: 5000,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);
export default api;