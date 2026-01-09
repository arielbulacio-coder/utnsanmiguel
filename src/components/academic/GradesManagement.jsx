import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const GradesManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [gradesData, setGradesData] = useState({});
    // Data Structure: { studentId: { t1_p1: val, t1_p2: val, ..., final_anual: val } }

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
            const response = await api.get('/alumnos');
            const allStudents = response.data;
            setStudents(allStudents);

            // Populate local grades state based on NEW model structure
            const initialGrades = {};

            allStudents.forEach(s => {
                // Find note record for THIS subject
                // Backend now returns Notes array inside student. 
                // We need to find the one matching current subject.
                const noteRecord = s.Notas?.find(n => n.materia === selectedSubject);
                if (noteRecord) {
                    initialGrades[s.id] = { ...noteRecord }; // copy all fields
                    // Ensure decimals are strings for inputs
                    Object.keys(initialGrades[s.id]).forEach(k => {
                        if (initialGrades[s.id][k] === null) initialGrades[s.id][k] = '';
                    });
                } else {
                    initialGrades[s.id] = {}; // empty
                }
            });
            setGradesData(initialGrades);
        } catch (error) {
            console.error('Error fetching data:', error);
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
            // Send everything for this student/subject
            // upsert logic in backend relies on AlumnoId + materia
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

    const getColor = (val) => {
        if (!val && val !== 0) return 'white';
        const num = parseFloat(val);
        if (isNaN(num)) return 'white';
        return num >= 7 ? '#4caf50' : '#ff5252'; // Green : Red
    };

    const getInputColor = (val) => {
        if (!val && val !== 0) return 'white';
        const num = parseFloat(val);
        if (isNaN(num)) return 'white';
        return num >= 7 ? '#4caf50' : '#ff5252';
    };

    const calculateTrimesterAvg = (studentId, trimesterPrefix) => {
        const d = gradesData[studentId] || {};
        const p1 = parseFloat(d[`${trimesterPrefix}_p1`]);
        const p2 = parseFloat(d[`${trimesterPrefix}_p2`]);
        const p3 = parseFloat(d[`${trimesterPrefix}_p3`]);

        const validValues = [p1, p2, p3].filter(n => !isNaN(n));
        if (validValues.length === 0) return '-';

        const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
        return avg.toFixed(2);
    };

    const filteredStudents = isStudentOrParent
        ? students.filter(s => s.email === user.email || s.email_padre === user.email)
        : students.filter(s => s.curso === selectedCourse);

    // Render Helper for Input Cells
    const renderCell = (studentId, field) => (
        <td style={{ padding: '0.2rem' }}>
            <input
                type="number"
                step="0.01" min="1" max="10"
                className="form-control text-center p-0"
                style={{
                    width: '100%',
                    minWidth: '40px',
                    fontSize: '0.9rem',
                    background: 'rgba(0,0,0,0.2)',
                    color: getInputColor(gradesData[studentId]?.[field]),
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                value={gradesData[studentId]?.[field] || ''}
                onChange={(e) => handleInputChange(studentId, field, e.target.value)}
                disabled={isStudentOrParent}
            />
        </td>
    );

    // Render Helper for ReadOnly Avg
    const renderAvg = (studentId, prefix) => {
        const avg = calculateTrimesterAvg(studentId, prefix);
        return (
            <td className="text-center fw-bold" style={{ color: getColor(avg), background: 'rgba(255,255,255,0.05)', minWidth: '45px' }}>
                {avg}
            </td>
        );
    };

    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem' }}>
            <h1 className="mb-4 text-center">Boletín de Calificaciones</h1>

            <div className="glass-card mb-4" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'center' }}>
                {!isStudentOrParent && (
                    <div style={{ flex: 1, minWidth: '150px', maxWidth: '300px' }}>
                        <label className="d-block mb-1">Curso</label>
                        <select className="form-control" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}
                <div style={{ flex: 1, minWidth: '150px', maxWidth: '300px' }}>
                    <label className="d-block mb-1">Materia</label>
                    <select className="form-control" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                {!isStudentOrParent && (
                    <button className="btn btn-primary" onClick={handleSaveAll} disabled={loading} style={{ height: '38px', minWidth: '120px' }}>
                        {loading ? '...' : '💾 Guardar Todo'}
                    </button>
                )}
            </div>

            <div className="glass-card" style={{ padding: '0.5rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px', fontSize: '0.85rem' }}>
                    <thead>
                        <tr className="text-center" style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th className="text-start p-2" rowSpan="2" style={{ width: '180px', position: 'sticky', left: 0, background: '#2a2a2a', zIndex: 10 }}>Alumno</th>
                            <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>1° Trimestre</th>
                            <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>2° Trimestre</th>
                            <th colSpan="4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>3° Trimestre</th>
                            <th colSpan="4" style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }}>Definitiva</th>
                        </tr>
                        <tr className="text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
                            {/* T1 */}
                            <th style={{ background: 'rgba(255,255,255,0.05)' }}>N1</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>N2</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>N3</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>Prom</th>
                            {/* T2 */}
                            <th style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>N1</th><th>N2</th><th>N3</th><th>Prom</th>
                            {/* T3 */}
                            <th style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>N1</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>N2</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>N3</th><th style={{ background: 'rgba(255,255,255,0.05)' }}>Prom</th>
                            {/* Finales */}
                            <th style={{ borderLeft: '2px solid rgba(255,255,255,0.2)' }} title="Nota Final Anual">Anual</th>
                            <th title="Recuperatorio Diciembre">Dic</th><th title="Recuperatorio Febrero">Feb</th><th title="Nota Final de Cursada">FINAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td className="p-2 text-truncate" style={{ maxWidth: '180px', position: 'sticky', left: 0, background: '#1a1a1a', zIndex: 5, borderRight: '1px solid #333' }}>
                                    {student.apellido}, {student.nombre}
                                </td>

                                {/* Trimestre 1 */}
                                {renderCell(student.id, 't1_p1')}
                                {renderCell(student.id, 't1_p2')}
                                {renderCell(student.id, 't1_p3')}
                                {renderAvg(student.id, 't1')}

                                {/* Trimestre 2 */}
                                {renderCell(student.id, 't2_p1')}
                                {renderCell(student.id, 't2_p2')}
                                {renderCell(student.id, 't2_p3')}
                                {renderAvg(student.id, 't2')}

                                {/* Trimestre 3 */}
                                {renderCell(student.id, 't3_p1')}
                                {renderCell(student.id, 't3_p2')}
                                {renderCell(student.id, 't3_p3')}
                                {renderAvg(student.id, 't3')}

                                {/* Finales */}
                                {renderCell(student.id, 'final_anual')}
                                {renderCell(student.id, 'recup_diciembre')}
                                {renderCell(student.id, 'recup_febrero')}
                                {renderCell(student.id, 'final_cursada')}
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr><td colSpan="17" className="text-center p-4">No se encontraron alumnos para este curso.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradesManagement;
