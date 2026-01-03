import axios from 'axios';

const api = axios.create({
    // Si usas Vite, recuerda poner VITE_API_URL en tu .env
    baseURL: import.meta.env.VITE_API_URL || 'https://backutn.onrender.com',
});

export default api;
