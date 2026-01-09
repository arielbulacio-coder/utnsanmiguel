import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const Attendance = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/alumnos');
            setStudents(response.data);
            // Inicializar estado de asistencia
            const initialData = {};
            response.data.forEach(student => {
                initialData[student.id] = 'presente';
            });
            setAttendanceData(initialData);
        } catch (error) {
            console.error('Error fetching students:', error);
            setMessage('Error al cargar estudiantes (¿Tienes permisos?)');
        }
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');
        try {
            const payload = Object.keys(attendanceData).map(studentId => ({
                AlumnoId: studentId,
                estado: attendanceData[studentId],
                fecha: new Date().toISOString().split('T')[0] // Fecha de hoy YYYY-MM-DD
            }));

            await api.post('/asistencias', payload);
            setMessage('Asistencia guardada exitosamente');
        } catch (error) {
            console.error('Error saving attendance:', error);
            setMessage('Error al guardar asistencia: ' + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    // Verificar permisos (Rol)
    const allowedRoles = ['admin', 'preceptor', 'jefe_preceptores', 'director'];
    const canTakeAttendance = user && allowedRoles.includes(user.role);

    if (!canTakeAttendance) {
        return (
            <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center' }}>
                <h2>Acceso Restringido</h2>
                <p>No tienes permisos para tomar asistencia. Tu rol actual es: {user?.role || 'Desconocido'}</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Control de Asistencia</h1>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Tomar Asistencia - {new Date().toLocaleDateString()}</h2>
                    <span className="result-label" style={{ background: 'var(--primary-color)' }}>{user.role.toUpperCase()}</span>
                </div>

                {message && <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Alumno</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Legajo</th>
                                <th style={{ textAlign: 'center', padding: '1rem' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{student.nombre} {student.apellido}</td>
                                    <td style={{ padding: '1rem' }}>{student.legajo}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <select
                                            value={attendanceData[student.id] || 'presente'}
                                            onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                            style={{ padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--primary-color)' }}
                                        >
                                            <option value="presente">Presente</option>
                                            <option value="ausente">Ausente</option>
                                            <option value="tarde">Tarde</option>
                                            <option value="justificado">Justificado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            padding: '1rem 2rem',
                            background: 'var(--primary-color)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Guardando...' : 'Guardar Asistencia'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
