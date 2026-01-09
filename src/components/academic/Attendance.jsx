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
    const [activeTab, setActiveTab] = useState('view'); // 'edit' or 'view'

    // Estado para "Mi Asistencia" (Vista Calendario)
    const [myAttendance, setMyAttendance] = useState([]);
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [viewYear, setViewYear] = useState(new Date().getFullYear());

    const isStudentOrParent = user && ['alumno', 'padre'].includes(user.role);
    const canEdit = user && ['admin', 'preceptor', 'director', 'jefe_preceptores'].includes(user.role);

    useEffect(() => {
        if (canEdit && !isStudentOrParent) {
            setActiveTab('edit');
            fetchStudentsAndAttendance();
        } else {
            setActiveTab('view');
            fetchMyAttendance();
        }
    }, [user, canEdit, isStudentOrParent]);

    // FETCH FOR EDITING (Teacher/Preceptor)
    const fetchStudentsAndAttendance = async () => {
        setLoading(true);
        try {
            const resStudents = await api.get('/alumnos');
            const allStudents = resStudents.data;
            setStudents(allStudents);

            // Fetch attendance for specific date
            // Note: API should ideally filter by date/course for performance
            // Here fetching all is potentially heavy, but standard for this prototype
            const resAttendance = await api.get('/asistencias');
            processEditingAttendance(resAttendance.data, allStudents, date);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const processEditingAttendance = (allRecords, studentList, targetDate) => {
        const currentData = {};
        studentList.forEach(s => {
            // Default to present if no record
            currentData[s.id] = { estado: 'presente', observacion: '' };
        });

        allRecords.forEach(a => {
            if (a.fecha === targetDate) {
                currentData[a.AlumnoId] = { estado: a.estado, observacion: a.observacion || '' };
            }
        });
        setAttendanceData(currentData);
    };

    // Refetch when date changes in Edit Mode
    useEffect(() => {
        if (activeTab === 'edit') {
            fetchStudentsAndAttendance();
        }
    }, [date]);

    // FETCH FOR VIEWING (Student/Parent)
    const fetchMyAttendance = async () => {
        setLoading(true);
        try {
            // Student gets own attendance via /boletin equivalent or filtered /asistencias
            // Currently using /boletin endpoint logic in Grades, but here we can re-use /alumnos with include Asistencia
            // Or better: Use /boletin if available, otherwise filter /alumnos results.
            // Since we implemented /boletin in backend, let's use a specific call or filter.
            // Simplified: User 'student' or 'parent' calls /boletin which returns Alumno with Asistencias

            const response = await api.get('/boletin'); // Use the endpoint that returns logged user's data
            if (response.data && response.data.Asistencias) {
                setMyAttendance(response.data.Asistencias);
            }
        } catch (error) {
            console.error('Error fetching my attendance:', error);
        }
        setLoading(false);
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
            alert('Error al guardar asistencia');
        }
    };

    // --- CALENDAR HELPERS ---
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay(); // 0 = Sun

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(viewMonth, viewYear);
        const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} style={{ height: '40px' }}></div>);
        }

        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const record = myAttendance.find(a => a.fecha === dateStr);

            let bg = 'rgba(255,255,255,0.05)';
            if (record) {
                if (record.estado === 'presente') bg = 'rgba(76, 175, 80, 0.3)'; // Green
                if (record.estado === 'ausente') bg = 'rgba(244, 67, 54, 0.3)'; // Red
                if (record.estado === 'tarde') bg = 'rgba(255, 193, 7, 0.3)'; // Yellow
                if (record.estado === 'justificado') bg = 'rgba(33, 150, 243, 0.3)'; // Blue
            }

            days.push(
                <div key={d} style={{
                    height: '40px', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bg, borderRadius: '4px', position: 'relative', cursor: 'default'
                }} title={record ? `${record.estado} - ${record.observacion || ''}` : 'Sin registro'}>
                    {d}
                </div>
            );
        }
        return days;
    };

    const countAbsences = () => {
        return myAttendance.filter(a => a.estado === 'ausente').length;
    };

    const countTotal = () => myAttendance.length;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-center">Asistencia y Puntualidad</h1>

            {/* TABS */}
            <div className="d-flex justify-content-center gap-3 mb-4">
                {canEdit && (
                    <button className={`btn ${activeTab === 'edit' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setActiveTab('edit')}>
                        ✏️ Tomar Asistencia
                    </button>
                )}
                <button className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('view')}>
                    📅 Mi Asistencia
                </button>
            </div>

            {activeTab === 'edit' ? (
                // --- EDIT MODE ---
                <div>
                    <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label className="d-block mb-2">Curso</label>
                            <select className="form-control" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label className="d-block mb-2">Fecha</label>
                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={handleSave} style={{ height: '42px', minWidth: '150px' }}>💾 Guardar</button>
                    </div>

                    <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                                {students.filter(s => s.curso === selectedCourse).map(student => {
                                    const status = attendanceData[student.id]?.estado || 'presente';
                                    return (
                                        <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '1rem' }}>{student.apellido}, {student.nombre}</td>
                                            {['presente', 'ausente', 'tarde', 'justificado'].map(option => (
                                                <td key={option} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleStatusChange(student.id, option)}>
                                                    <div style={{
                                                        width: '24px', height: '24px', borderRadius: '50%', margin: '0 auto',
                                                        border: '2px solid rgba(255,255,255,0.5)',
                                                        backgroundColor: status === option ? (option === 'presente' ? '#4CAF50' : option === 'ausente' ? '#F44336' : option === 'tarde' ? '#FFC107' : '#2196F3') : 'transparent',
                                                        boxShadow: status === option ? '0 0 8px currentColor' : 'none'
                                                    }} />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                // --- VIEW MODE ---
                <div className="glass-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <button className="btn btn-sm btn-outline-light" onClick={() => setViewMonth(prev => prev === 0 ? 11 : prev - 1)}>◀ Ant</button>
                        <h3 className="m-0">{new Date(viewYear, viewMonth).toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()}</h3>
                        <button className="btn btn-sm btn-outline-light" onClick={() => setViewMonth(prev => prev === 11 ? 0 : prev + 1)}>Sig ▶</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '2rem' }}>
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <div key={d} className="text-center fw-bold text-secondary">{d}</div>)}
                        {renderCalendar()}
                    </div>

                    <div className="d-flex justify-content-around flex-wrap gap-3 p-3" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                        <div className="text-center">
                            <h2 style={{ color: '#F44336' }}>{countAbsences()}</h2>
                            <span className="text-secondary">Inasistencias</span>
                        </div>
                        <div className="text-center">
                            <h2 style={{ color: '#4CAF50' }}>{myAttendance.filter(a => a.estado === 'presente').length}</h2>
                            <span className="text-secondary">Presentes</span>
                        </div>
                        <div className="text-center">
                            <h2 style={{ color: '#FFC107' }}>{myAttendance.filter(a => a.estado === 'tarde').length}</h2>
                            <span className="text-secondary">Tardanzas</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
