import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const TeacherRegistration = () => {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            // Reusing /users endpoint which is now open to director/secretario
            const response = await api.get('/users');
            const profs = response.data.filter(u => u.role === 'profesor');
            setTeachers(profs);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Register creates a user. We enforce role 'profesor'.
            await api.post('/register', {
                email: formData.email,
                password: formData.password,
                role: 'profesor'
            });
            setMessage('Docente registrado correctamente.');
            setFormData({ email: '', password: '' });
            fetchTeachers();
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Error al crear docente'));
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="text-center mb-4">Alta de Docentes</h1>

            <div className="glass-card p-4 mb-4">
                <h3 className="mb-3">Registrar Nuevo Docente</h3>
                {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

                <form onSubmit={handleCreate} className="d-flex flex-column gap-3">
                    <div>
                        <label className="d-block mb-1">Email Institucional</label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="nombre.apellido@utn.edu.ar"
                        />
                    </div>
                    <div>
                        <label className="d-block mb-1">Contraseña Inicial</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Registrando...' : 'Dar de Alta'}
                    </button>
                </form>
            </div>

            <div className="glass-card p-4">
                <h3>Plantel Docente Actual</h3>
                <div className="table-responsive mt-3">
                    <table className="table" style={{ color: 'var(--text-primary)' }}>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Fecha Alta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(t => (
                                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td>{t.email}</td>
                                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {teachers.length === 0 && <tr><td colSpan="2" className="text-center">No hay docentes registrados.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherRegistration;
