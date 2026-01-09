import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const GradesManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [gradesData, setGradesData] = useState({}); // { studentId_materia_trimestre: valor }
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
    const [loading, setLoading] = useState(false);

    const isStudentOrParent = user && ['alumno', 'padre'].includes(user.role);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/alumnos');
            const allStudents = response.data;
            setStudents(allStudents);

            // Populate local grades state
            const initialGrades = {};
            allStudents.forEach(s => {
                s.Notas?.forEach(n => {
                    const key = `${s.id}_${n.materia}_${n.trimestre}`;
                    initialGrades[key] = n.valor;
                });
            });
            setGradesData(initialGrades);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleGradeInput = (studentId, trimester, value) => {
        const key = `${studentId}_${selectedSubject}_${trimester}`;
        setGradesData(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveAll = async () => {
        setLoading(true);
        const filteredStudents = students.filter(s => s.curso === selectedCourse);

        // Prepare payloads only for changed/present values in current view
        const promises = [];

        filteredStudents.forEach(s => {
            [1, 2, 3].forEach(trim => {
                const key = `${s.id}_${selectedSubject}_${trim}`;
                const val = gradesData[key];

                // Only save if there is a value (even if 0, but usually not empty string)
                if (val !== undefined && val !== '') {
                    promises.push(api.post('/notas', {
                        AlumnoId: s.id,
                        valor: parseFloat(val),
                        materia: selectedSubject,
                        trimestre: trim
                    }));
                }
            });
        });

        try {
            await Promise.all(promises);
            alert('Notas guardadas correctamente');
            fetchData(); // Refresh to ensure sync
        } catch (error) {
            console.error('Error saving grades:', error);
            alert('Error al guardar notas');
        }
        setLoading(false);
    };

    const filteredStudents = isStudentOrParent
        ? students.filter(s => s.email === user.email) // Show only self if logged as student (simplified logic)
        : students.filter(s => s.curso === selectedCourse);

    const getGradeValue = (studentId, trimester) => {
        // If viewing specific subject
        if (selectedSubject) {
            return gradesData[`${studentId}_${selectedSubject}_${trimester}`] || '';
        }
        return '';
    };

    const calculateAverage = (studentId) => {
        let sum = 0;
        let count = 0;
        [1, 2, 3].forEach(t => {
            const val = parseFloat(gradesData[`${studentId}_${selectedSubject}_${t}`]);
            if (!isNaN(val)) {
                sum += val;
                count++;
            }
        });
        return count > 0 ? (sum / count).toFixed(2) : '-';
    };

    // View for Students/Parents (ReadOnly, maybe all subjects?)
    if (isStudentOrParent) {
        // Find the student record matching logged user
        const myStudent = students.find(s => s.email === user.email); // Assuming email match

        if (!myStudent) return <div className="p-5 text-center"><h3>No se encontró información académica asociada a tu usuario.</h3></div>;

        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <h1 className="mb-4">Mis Calificaciones</h1>
                <div className="glass-card p-4">
                    <h3>{myStudent.apellido}, {myStudent.nombre} <small>({myStudent.curso})</small></h3>
                    <hr className="my-3" />
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid white' }}>
                                <th className="text-start p-2">Materia</th>
                                <th className="text-center p-2">Trim 1</th>
                                <th className="text-center p-2">Trim 2</th>
                                <th className="text-center p-2">Trim 3</th>
                                <th className="text-center p-2">Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SUBJECTS.map(subj => {
                                // Calculate grades for this subject based on pre-loaded data (or need to filter efficiently)
                                // Since we flattened data nicely, we can just look it up if we loaded ALL data. 
                                // But current GradesData is flat key based.
                                // Let's use the object from student.Notas directly for read-only view since it's easier.
                                const getNote = (t) => myStudent.Notas?.find(n => n.materia === subj && n.trimestre === t)?.valor || '-';
                                const validNotes = myStudent.Notas?.filter(n => n.materia === subj).map(n => parseFloat(n.valor)) || [];
                                const avg = validNotes.length ? (validNotes.reduce((a, b) => a + b, 0) / validNotes.length).toFixed(2) : '-';

                                return (
                                    <tr key={subj} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <td className="p-2">{subj}</td>
                                        <td className="text-center p-2">{getNote(1)}</td>
                                        <td className="text-center p-2">{getNote(2)}</td>
                                        <td className="text-center p-2">{getNote(3)}</td>
                                        <td className="text-center p-2 fw-bold">{avg}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // View for Teachers/Admins
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4">Boletín de Calificaciones</h1>

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
                    <label className="d-block mb-2">Materia</label>
                    <select
                        className="form-control"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSaveAll}
                    disabled={loading}
                    style={{ height: '42px', minWidth: '150px' }}
                >
                    {loading ? 'Guardando...' : '💾 Guardar Todo'}
                </button>
            </div>

            <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Alumno</th>
                            <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>Trim 1</th>
                            <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>Trim 2</th>
                            <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>Trim 3</th>
                            <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem' }}>{student.apellido}, {student.nombre}</td>
                                {[1, 2, 3].map(trim => (
                                    <td key={trim} style={{ padding: '0.5rem', textAlign: 'center' }}>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            style={{ width: '80px', margin: '0 auto', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                            value={getGradeValue(student.id, trim)}
                                            onChange={(e) => handleGradeInput(student.id, trim, e.target.value)}
                                            min="1" max="10" step="0.1"
                                        />
                                    </td>
                                ))}
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                                    {calculateAverage(student.id)}
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr><td colSpan="5" className="text-center p-4">No hay alumnos en el curso seleccionado.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradesManagement;
