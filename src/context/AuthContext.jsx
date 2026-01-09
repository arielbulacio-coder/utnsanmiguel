
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al iniciar, verificamos si hay un token válido
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Opcional: Podrías verificar la validez del token aquí llamando a un endpoint /me o decodificándolo
            // Por ahora asumimos que si está, el usuario está logueado (la API rechazará si es inválido)
            setUser({ name: 'Usuario' }); // Placeholder hasta que tengamos info real del usuario
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Ajusta este endpoint según tu backend real
            const response = await api.post('/login', { email, password });

            // Asumiendo que el backend devuelve { token: '...', user: {...} }
            const { token: newToken, user: userData } = response.data;

            setToken(newToken);
            setUser(userData || { email }); // Fallback si el back no devuelve user data
            localStorage.setItem('token', newToken);
            return { success: true };
        } catch (error) {
            console.error("Login component error:", error);
            return {
                success: false,
                message: error.response?.data?.message || 'Error al iniciar sesión'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
