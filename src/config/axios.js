import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/';

const config = {
    baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

// handle before call API
const handleBefore = (config) => {
    //config.headers['Authorization'] = 'No Auth';
    if (config.url.includes('users')) {
        return config;
    } else if (config.url.includes('auth/login')) {
        return config;
    } else if (config.url.includes('SearchPets?')) {
        return config;
    } else if (config.url.includes('sort6Pets')) {
        return config;
    } else if (config.url.includes('pets/')) {
        return config;
    } else if (config.url.includes('applications')) {
        return config;
    }
    const token = localStorage.getItem('token')?.replaceAll('"', '');
    //if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    //}
    return config;
};

api.interceptors.request.use(handleBefore, null);

export default api;
