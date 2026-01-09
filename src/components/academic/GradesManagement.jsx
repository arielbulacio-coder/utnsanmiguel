import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const GradesManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/alumnos');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleGradeChange = async (studentId, trimester, value) => {
        // En un caso real, validaríamos y usaríamos un endpoint de PATCH/PUT o lógica de "upsert"
        // Como el backend actual solo tiene POST (crear), esto duplicará si ya existe.
        // TODO ideal: Backend endpoint PUT /notas/:id o POST /notas que maneje updates.

        if (!value) return;

        try {
            await api.post('/notas', {
                AlumnoId: studentId,
                valor: parseFloat(value),
                materia: selectedSubject,
                trimestre: trimester
            });
            // Recargar datos para ver reflejado (o actualizar estado local optimisticamente)
            fetchData();
        } catch (error) {
            console.error('Error saving grade:', error);
            alert('Error al guardar nota');
        }
    };

    const filteredStudents = students.filter(s => s.curso === selectedCourse);

    const getGrade = (student, trimester) => {
        const note = student.Notas?.find(n => n.materia === selectedSubject && n.trimestre === trimester);
        return note ? note.valor : '';
    };

    const calculateAverage = (student) => {
        const notes = student.Notas?.filter(n => n.materia === selectedSubject) || [];
        if (notes.length === 0) return '-';
        const sum = notes.reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
        return (sum / notes.length).toFixed(2);
    };

    const allowedRoles = ['admin', 'profesor', 'director', 'secretario'];
    if (user && !allowedRoles.includes(user.role)) {
        return <div className="text-center p-5"><h3>Acceso Restringido</h3></div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4">Boletín de Calificaciones</h1>

            <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                                            defaultValue={getGrade(student, trim)}
                                            onBlur={(e) => {
                                                const val = e.target.value;
                                                const current = getGrade(student, trim);
                                                if (val && val !== String(current)) {
                                                    handleGradeChange(student.id, trim, val);
                                                }
                                            }}
                                            min="1" max="10" step="0.1"
                                        />
                                    </td>
                                ))}
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                                    {calculateAverage(student)}
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr><td colSpan="5" className="text-center p-4">No hay alumnos en este curso.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradesManagement;
