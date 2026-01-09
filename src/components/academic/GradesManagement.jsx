import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const GradesManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [myStudentData, setMyStudentData] = useState(null);
    const [gradesData, setGradesData] = useState({});

    // States for Teacher View
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);

    const [loading, setLoading] = useState(false);

    const isStudentOrParent = user && ['alumno', 'padre'].includes(user.role);

    useEffect(() => {
        fetchData();
    }, [selectedSubject]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (isStudentOrParent) {
                // SEGURO: Pide solo su boletín
                const response = await api.get('/boletin');
                console.log('Boletin Data:', response.data);
                setMyStudentData(response.data);
            } else {
                // VISTA PROFESOR: Lista completa
                const response = await api.get('/alumnos');
                const allStudents = response.data;
                setStudents(allStudents);

                const initialGrades = {};
                allStudents.forEach(s => {
                    const noteRecord = s.Notas?.find(n => n.materia === selectedSubject);
                    if (noteRecord) {
                        initialGrades[s.id] = { ...noteRecord };
                        Object.keys(initialGrades[s.id]).forEach(k => {
                            if (initialGrades[s.id][k] === null) initialGrades[s.id][k] = '';
                        });
                    } else {
                        initialGrades[s.id] = {};
                    }
                });
                setGradesData(initialGrades);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (isStudentOrParent) setMyStudentData(null);
        }
        setLoading(false);
    };

    const handleInputChange = (studentId, field, value) => {
        setGradesData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const handleSaveAll = async () => {
        setLoading(true);
        const filteredStudents = students.filter(s => s.curso === selectedCourse);

        const promises = filteredStudents.map(s => {
            const studentGrades = gradesData[s.id] || {};
            return api.post('/notas', {
                AlumnoId: s.id,
                materia: selectedSubject,
                ...studentGrades
            });
        });

        try {
            await Promise.all(promises);
            alert('Notas guardadas correctamente');
            fetchData();
        } catch (error) {
            console.error('Error saving grades:', error);
            alert('Error al guardar notas');
        }
        setLoading(false);
    };

    // --- Helpers ---
    const getColor = (val) => {
        if (!val && val !== 0) return 'white';
        const num = parseFloat(val);
        if (isNaN(num)) return 'white';
        return num >= 7 ? '#4caf50' : '#ff5252';
    };

    const getInputColor = (val) => {
        if (!val && val !== 0) return 'white';
        const num = parseFloat(val);
        if (isNaN(num)) return 'white';
        return num >= 7 ? '#4caf50' : '#ff5252';
    };

    // Only for Teacher View (Calculated on the fly from Inputs)
    const calculateTrimesterAvgInput = (studentId, trimesterPrefix) => {
        const d = gradesData[studentId] || {};
        const p1 = parseFloat(d[`${trimesterPrefix}_p1`]);
        const p2 = parseFloat(d[`${trimesterPrefix}_p2`]);
        const p3 = parseFloat(d[`${trimesterPrefix}_p3`]);
        const validValues = [p1, p2, p3].filter(n => !isNaN(n));
        if (validValues.length === 0) return '-';
        return (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(2);
    };

    // For Parent View (Calculated from Data Object directly)
    const calculateTrimesterAvgData = (noteObj, prefix) => {
        if (!noteObj) return '-';
        const p1 = parseFloat(noteObj[`${prefix}_p1`]);
        const p2 = parseFloat(noteObj[`${prefix}_p2`]);
        const p3 = parseFloat(noteObj[`${prefix}_p3`]);
        const validValues = [p1, p2, p3].filter(n => !isNaN(n));
        if (validValues.length === 0) return '-';
        return (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(2);
    };

    const studentForParent = isStudentOrParent ? myStudentData : null;

    // --- RENDER TEACHER VIEW ---
    if (!isStudentOrParent) {
        const filteredStudents = students.filter(s => s.curso === selectedCourse);

        const renderCell = (studentId, field) => (
            <td style={{ padding: '0.2rem' }}>
                <input
                    type="number"
                    step="0.01" min="1" max="10"
                    className="form-control text-center p-0"
                    style={{
                        width: '100%', minWidth: '40px', fontSize: '0.9rem',
                        background: 'rgba(0,0,0,0.2)',
                        color: getInputColor(gradesData[studentId]?.[field]),
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    value={gradesData[studentId]?.[field] || ''}
                    onChange={(e) => handleInputChange(studentId, field, e.target.value)}
                />
            </td>
        );

        const renderAvg = (studentId, prefix) => {
            const avg = calculateTrimesterAvgInput(studentId, prefix);
            return (
                <td className="text-center fw-bold" style={{ color: getColor(avg), background: 'rgba(255,255,255,0.05)', minWidth: '45px' }}>{avg}</td>
            );
        };

        return (
            <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem' }}>
                <h1 className="mb-4 text-center">Carga de Calificaciones</h1>
                <div className="glass-card mb-4" style={{ padding: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <div style={{ flex: 1, maxWidth: '300px' }}>
                        <label className="d-block mb-1">Curso</label>
                        <select className="form-control" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1, maxWidth: '300px' }}>
                        <label className="d-block mb-1">Materia</label>
                        <select className="form-control" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveAll} disabled={loading} style={{ height: '38px', minWidth: '120px', alignSelf: 'end' }}>
                        {loading ? '...' : '💾 Guardar'}
                    </button>
                </div>

                <div className="glass-card" style={{ padding: '0.5rem', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px', fontSize: '0.85rem' }}>
                        <thead>
                            <tr className="text-center" style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                                <th className="text-start p-2" rowSpan="2" style={{ width: '180px', position: 'sticky', left: 0, background: '#2a2a2a', zIndex: 10 }}>Alumno</th>
                                <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>1° Trimestre</th>
                                <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>2° Trimestre</th>
                                <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>3° Trimestre</th>
                                <th colSpan="4" style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>Definitiva</th>
                            </tr>
                            <tr className="text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
                                <th>N1</th><th>N2</th><th>N3</th><th>Prom</th>
                                <th style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>N1</th><th>N2</th><th>N3</th><th>Prom</th>
                                <th style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>N1</th><th>N2</th><th>N3</th><th>Prom</th>
                                <th style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>Anual</th><th>Dic</th><th>Feb</th><th>FINAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td className="p-2 text-truncate" style={{ maxWidth: '180px', position: 'sticky', left: 0, background: '#1a1a1a', zIndex: 5, borderRight: '1px solid #333' }}>
                                        {student.apellido}, {student.nombre}
                                    </td>
                                    {renderCell(student.id, 't1_p1')}
                                    {renderCell(student.id, 't1_p2')}
                                    {renderCell(student.id, 't1_p3')}
                                    {renderAvg(student.id, 't1')}

                                    {renderCell(student.id, 't2_p1')}
                                    {renderCell(student.id, 't2_p2')}
                                    {renderCell(student.id, 't2_p3')}
                                    {renderAvg(student.id, 't2')}

                                    {renderCell(student.id, 't3_p1')}
                                    {renderCell(student.id, 't3_p2')}
                                    {renderCell(student.id, 't3_p3')}
                                    {renderAvg(student.id, 't3')}

                                    {renderCell(student.id, 'final_anual')}
                                    {renderCell(student.id, 'recup_diciembre')}
                                    {renderCell(student.id, 'recup_febrero')}
                                    {renderCell(student.id, 'final_cursada')}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // --- RENDER PARENT/STUDENT VIEW (MATRIX) ---
    if (loading && !studentForParent) return <div className="p-5 text-center">Cargando boletín...</div>;
    if (!studentForParent) return <div className="p-5 text-center">No se encontró información del alumno.</div>;

    const myGrades = studentForParent.Notas || studentForParent.notas || [];

    const renderReadOnlyCell = (val) => (
        <td className="text-center" style={{ padding: '0.5rem', color: getColor(val) }}>
            {val || '-'}
        </td>
    );

    const renderReadOnlyAvg = (noteObj, prefix) => {
        const avg = calculateTrimesterAvgData(noteObj, prefix);
        return <td className="text-center fw-bold" style={{ color: getColor(avg), background: 'rgba(255,255,255,0.05)' }}>{avg}</td>;
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-center">Boletín de Calificaciones</h1>
            <div className="glass-card mb-4 p-4 text-center">
                <h3>{studentForParent.apellido}, {studentForParent.nombre}</h3>
                <p className="text-secondary m-0">
                    Legajo: {studentForParent.legajo} | Curso: {studentForParent.curso} | Email: {studentForParent.email}
                </p>
                {user.role === 'padre' && <span className="badge bg-info mt-2">Vista de Padre/Tutor</span>}
            </div>

            <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px', fontSize: '0.9rem' }}>
                    <thead>
                        <tr className="text-center" style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th className="text-start p-3" rowSpan="2" style={{ width: '200px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Materia</th>
                            <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>1° Trimestre</th>
                            <th colSpan="4">2° Trimestre</th>
                            <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>3° Trimestre</th>
                            <th colSpan="4" style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>Finales</th>
                        </tr>
                        <tr className="text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
                            <th style={{ background: 'rgba(255,255,255,0.02)' }}>N1</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>N2</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>N3</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>Prom</th>

                            <th>N1</th><th>N2</th><th>N3</th><th>Prom</th>

                            <th style={{ background: 'rgba(255,255,255,0.02)' }}>N1</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>N2</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>N3</th><th style={{ background: 'rgba(255,255,255,0.02)' }}>Prom</th>

                            <th style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>Anual</th><th>Dic</th><th>Feb</th><th>Def</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SUBJECTS.map(subject => {
                            // Búsqueda flexible (sin espacios, case insensitive)
                            const note = myGrades.find(n =>
                                n.materia.trim().toLowerCase() === subject.trim().toLowerCase()
                            );

                            if (note) console.log(`Mostrando notas para: ${subject}`, note);

                            return (
                                <tr key={subject} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td className="p-3 text-start fw-bold" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>{subject}</td>

                                    {renderReadOnlyCell(note?.t1_p1)}
                                    {renderReadOnlyCell(note?.t1_p2)}
                                    {renderReadOnlyCell(note?.t1_p3)}
                                    {renderReadOnlyAvg(note, 't1')}

                                    {renderReadOnlyCell(note?.t2_p1)}
                                    {renderReadOnlyCell(note?.t2_p2)}
                                    {renderReadOnlyCell(note?.t2_p3)}
                                    {renderReadOnlyAvg(note, 't2')}

                                    {renderReadOnlyCell(note?.t3_p1)}
                                    {renderReadOnlyCell(note?.t3_p2)}
                                    {renderReadOnlyCell(note?.t3_p3)}
                                    {renderReadOnlyAvg(note, 't3')}

                                    {renderReadOnlyCell(note?.final_anual)}
                                    {renderReadOnlyCell(note?.recup_diciembre)}
                                    {renderReadOnlyCell(note?.recup_febrero)}
                                    {/* Final Definitiva can be calculated or just show what is in DB */}
                                    <td className="fw-bold" style={{ color: getColor(note?.final_cursada) }}>{note?.final_cursada || '-'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradesManagement;
