
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirigir a la página que intentaba visitar o al home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="glass-card p-5" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4 text-gradient">Iniciar Sesión</h2>

                {error && <div className="alert alert-danger text-center p-2 mb-3">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: '500' }}>Email / Usuario</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Ingrese su usuario"
                            style={{ background: 'rgba(255,255,255,0.9)', border: 'none' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: '500' }}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control form-control-lg"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                style={{ background: 'rgba(255,255,255,0.9)', border: 'none', paddingRight: '45px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                {showPassword ? '👁️' : '🔒'}
                            </button>
                        </div>
                    </div>

                    <button disabled={loading} className="btn btn-primary w-100 btn-lg mt-2" type="submit" style={{ fontWeight: 'bold' }}>
                        {loading ? 'Cargando...' : 'INGRESAR'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
