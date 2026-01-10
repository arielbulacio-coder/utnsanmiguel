import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', password: '', role: 'alumno' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/register', newUser);
            setMessage('Usuario creado correctamente');
            setNewUser({ email: '', password: '', role: 'alumno' });
            fetchUsers();
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    if (!['admin', 'director'].includes(user?.role)) {
        return <div className="p-4 text-center">Acceso denegado. Solo administradores y directivos.</div>;
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            <h1>Gestión de Usuarios</h1>

            {/* Formulario de Creación */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3>Crear Nuevo Usuario</h3>
                {message && <p style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '4px' }}>{message}</p>}

                <form onSubmit={handleCreateUser} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                    >
                        <option value="alumno">Alumno</option>
                        <option value="profesor">Profesor</option>
                        <option value="preceptor">Preceptor</option>
                        <option value="jefe_preceptores">Jefe de Preceptores</option>
                        <option value="secretario">Secretario</option>
                        <option value="director">Director</option>
                        <option value="admin">Admin</option>
                        <option value="padre">Padre/Madre</option>
                    </select>
                    <button type="submit" style={{ padding: '0.5rem', background: 'var(--primary-color)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Crear Usuario
                    </button>
                </form>
            </div>

            {/* Tabla de Usuarios */}
            <div className="glass-card">
                <h3>Usuarios Registrados</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', color: 'var(--text-main)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                            <th style={{ padding: '0.5rem' }}>ID</th>
                            <th style={{ padding: '0.5rem' }}>Email</th>
                            <th style={{ padding: '0.5rem' }}>Rol</th>
                            <th style={{ padding: '0.5rem' }}>Fecha Creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '0.5rem' }}>{u.id}</td>
                                <td style={{ padding: '0.5rem' }}>{u.email}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    <span style={{
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        background: u.role === 'admin' ? 'red' : 'rgba(255,255,255,0.2)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={{ padding: '0.5rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
