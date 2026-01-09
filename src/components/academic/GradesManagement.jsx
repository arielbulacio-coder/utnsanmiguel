import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const GradesManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [materia, setMateria] = useState('');
    const [nota, setNota] = useState('');
    const [trimestre, setTrimestre] = useState('1');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/alumnos');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await api.post('/notas', {
                AlumnoId: selectedStudent,
                valor: parseFloat(nota),
                materia,
                trimestre: parseInt(trimestre)
            });
            setMessage('Nota cargada exitosamente');
            setNota('');
            setMateria('');
        } catch (error) {
            console.error('Error saving grade:', error);
            setMessage('Error al cargar nota: ' + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    // Verificar permisos (Rol)
    const allowedRoles = ['admin', 'profesor', 'director', 'secretario'];
    const canEditGrades = user && allowedRoles.includes(user.role);

    if (!canEditGrades) {
        return (
            <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center' }}>
                <h2>Acceso Restringido</h2>
                <p>No tienes permisos para gestionar calificaciones. Tu rol actual es: {user?.role || 'Desconocido'}</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Gestión de Calificaciones</h1>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Cargar Nueva Nota</h2>

                {message && <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                        <label>Alumno</label>
                        <select
                            required
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                        >
                            <option value="">Seleccionar Alumno...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.nombre} {s.apellido} - {s.legajo}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Materia</label>
                        <input
                            type="text"
                            required
                            placeholder="Ej. Matemática, Física..."
                            value={materia}
                            onChange={(e) => setMateria(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label>Nota (Valor)</label>
                            <input
                                type="number"
                                step="0.5"
                                min="1"
                                max="10"
                                required
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                            />
                        </div>
                        <div className="input-group">
                            <label>Trimestre</label>
                            <select
                                value={trimestre}
                                onChange={(e) => setTrimestre(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                            >
                                <option value="1">1° Trimestre</option>
                                <option value="2">2° Trimestre</option>
                                <option value="3">3° Trimestre</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'var(--primary-color)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Guardando...' : 'Cargar Nota'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GradesManagement;
