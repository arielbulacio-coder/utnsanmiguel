import React, { useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirm) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);
        try {
            const res = await api.post(`/reset-password/${token}`, { newPassword: password });
            setMessage(res.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al restablecer contraseña. El token puede haber expirado.');
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card p-5" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Nueva Contraseña</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nueva Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? 'Guardando...' : 'Restablecer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
