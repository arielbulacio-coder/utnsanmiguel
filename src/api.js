import axios from 'axios';

const api = axios.create({
    // Si usas Vite, recuerda poner VITE_API_URL en tu .env
    baseURL: import.meta.env.VITE_API_URL || 'https://backutn.onrender.com',
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
