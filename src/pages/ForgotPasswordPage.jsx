import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const res = await api.post('/forgot-password', { email });
            setMessage(res.data.message);
            // Si el backend envió el link de debug, podrías mostrarlo en desarrollo, 
            // pero para el usuario final solo mostramos el mensaje de éxito.
            if (res.data.debugLink) {
                console.log('DEBUG LINK:', res.data.debugLink);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al solicitar recuperación');
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card p-5" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Recuperar Contraseña</h2>
                <p className="text-center mb-4" style={{ color: '#ccc' }}>
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Institucional</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ejemplo@utn.com"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                    <div className="text-center">
                        <Link to="/login" style={{ color: 'var(--text-secondary)' }}>Volver al Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
