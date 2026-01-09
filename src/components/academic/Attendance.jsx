import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from './constants';

const Attendance = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({}); // { studentId: { estado: 'presente', observacion: '' } }
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // Re-fetch when date changes to allow editing past attendance (if implemented)
    // For now, simple fetch
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Students
            const resStudents = await api.get('/alumnos');
            const allStudents = resStudents.data;
            setStudents(allStudents);

            // Fetch Existing Attendance
            const resAttendance = await api.get('/asistencias');
            processExistingAttendance(resAttendance.data, allStudents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const processExistingAttendance = (matches, allStudents) => {
        const currentData = {};
        allStudents.forEach(s => {
            currentData[s.id] = { estado: 'presente', observacion: '' };
        });

        matches.forEach(a => {
            // Check if matches date. 
            // Note: 'a.fecha' from DB is usually 'YYYY-MM-DD' string.
            if (a.fecha === date) {
                currentData[a.AlumnoId] = { estado: a.estado, observacion: a.observacion || '' };
            }
        });
        setAttendanceData(currentData);
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], estado: status }
        }));
    };

    const handleSave = async () => {
        const filteredStudents = students.filter(s => s.curso === selectedCourse);
        if (filteredStudents.length === 0) return;

        const payload = filteredStudents.map(s => ({
            AlumnoId: s.id,
            fecha: date,
            estado: attendanceData[s.id]?.estado || 'presente',
            observacion: attendanceData[s.id]?.observacion
        }));

        try {
            await api.post('/asistencias', payload);
            alert('Asistencia guardada correctamente');
        } catch (error) {
            console.error('Error saving attendance:', error);
            alert('Error al guardar asistencia');
        }
    };

    const filteredStudents = students.filter(s => s.curso === selectedCourse);

    const allowedRoles = ['admin', 'preceptor', 'jefe_preceptores', 'director'];
    if (user && !allowedRoles.includes(user.role)) {
        return <div className="text-center p-5"><h3>Acceso Restringido</h3></div>;
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: 'var(--text-primary)' }}>Control de Asistencia</h1>
                <span className="badge bg-primary" style={{ fontSize: '1rem' }}>{user.role}</span>
            </div>

            <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="d-block mb-2">Curso</label>
                    <select
                        className="form-control"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="d-block mb-2">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            // Trigger re-process of attendance data for new date would be ideal here if we had all data locally
                            fetchData(); // Lazy update: re-fetch everything. In prod optimized endpoint needed.
                        }}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSave} style={{ height: '42px', minWidth: '150px' }}>
                    💾 Guardar
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Alumno</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Presente</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Ausente</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Tarde</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Justificado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => {
                            const status = attendanceData[student.id]?.estado || 'presente';
                            return (
                                <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{student.apellido}, {student.nombre}</td>
                                    {['presente', 'ausente', 'tarde', 'justificado'].map(option => (
                                        <td key={option} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleStatusChange(student.id, option)}>
                                            <div
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    border: '2px solid rgba(255,255,255,0.5)',
                                                    margin: '0 auto',
                                                    backgroundColor: status === option ? '#4CAF50' : 'transparent',
                                                    boxShadow: status === option ? '0 0 10px #4CAF50' : 'none',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        {filteredStudents.length === 0 && (
                            <tr><td colSpan="5" className="text-center p-4">Select a course to view students.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
