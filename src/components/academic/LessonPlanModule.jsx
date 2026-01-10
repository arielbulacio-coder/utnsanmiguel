import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const LessonPlanModule = () => {
    const { user } = useAuth();
    const [lessonPlans, setLessonPlans] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    // Teacher Assignment Logic
    const [assignedOptions, setAssignedOptions] = useState([]); // [{ curso, materia }]
    const [availableCourses, setAvailableCourses] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);

    const isInternalStaff = ['admin', 'director', 'secretario', 'jefe_preceptores'].includes(user.role);
    const isTeacher = user.role === 'profesor';

    // 1. Fetch Assignments if Teacher
    useEffect(() => {
        const fetchAssignments = async () => {
            if (isTeacher) {
                try {
                    const res = await api.get('/profesor/asignaciones');
                    setAssignedOptions(res.data);

                    // Extract unique courses
                    const courses = [...new Set(res.data.map(item => item.curso))];
                    setAvailableCourses(courses);
                    if (courses.length > 0) setSelectedCourse(courses[0]);

                } catch (error) {
                    console.error("Error fetching assignments:", error);
                }
            } else if (isInternalStaff) {
                setAvailableCourses(COURSES);
                setAvailableSubjects(SUBJECTS);
                setSelectedCourse(COURSES[0]);
                setSelectedSubject(SUBJECTS[0]);
            }
        };
        fetchAssignments();
    }, [user, isTeacher, isInternalStaff]);

    // Update Subjects when Course changes (Teacher)
    useEffect(() => {
        if (isTeacher && selectedCourse) {
            const subjects = assignedOptions
                .filter(item => item.curso === selectedCourse)
                .map(item => item.materia);
            setAvailableSubjects(subjects);
            if (subjects.length > 0) setSelectedSubject(subjects[0]);
        }
    }, [selectedCourse, assignedOptions, isTeacher]);

    // Data Fetching
    useEffect(() => {
        if (selectedCourse && selectedSubject) {
            fetchLessonPlans();
        }
    }, [selectedCourse, selectedSubject]);

    const fetchLessonPlans = async () => {
        try {
            const res = await api.get('/libro-temas', {
                params: { curso: selectedCourse, materia: selectedSubject }
            });
            setLessonPlans(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Form State
    const [formData, setFormData] = useState({
        fecha: new Date().toISOString().split('T')[0],
        tema: '',
        actividad: '',
        observacion: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourse || !selectedSubject) return alert('Seleccione curso y materia');

        try {
            await api.post('/libro-temas', {
                ...formData,
                curso: selectedCourse,
                materia: selectedSubject
            });
            alert('Tema registrado correctamente');
            setFormData({ ...formData, tema: '', actividad: '', observacion: '' });
            fetchLessonPlans();
        } catch (error) {
            alert('Error al registrar tema');
        }
    };

    return (
        <div className="container p-4">
            <h2 className="mb-4 text-center">📖 Libro de Temas</h2>

            {/* Selectors */}
            <div className="glass-card mb-4 p-3 d-flex gap-3 flex-wrap">
                <div style={{ flex: 1 }}>
                    <label>Curso:</label>
                    <select className="form-control" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                        {availableCourses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label>Materia:</label>
                    <select className="form-control" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                        {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {/* Form - Only for Teacher/Admin/Director */}
                {(isTeacher || ['admin', 'director'].includes(user.role)) && (
                    <div className="col-md-4">
                        <div className="glass-card p-4">
                            <h4>Nuevo Registro</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Fecha</label>
                                    <input type="date" className="form-control" required
                                        value={formData.fecha}
                                        onChange={e => setFormData({ ...formData, fecha: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Tema Dictado</label>
                                    <input type="text" className="form-control" required placeholder="Ej: Ley de Ohm"
                                        value={formData.tema}
                                        onChange={e => setFormData({ ...formData, tema: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Actividad Realizada</label>
                                    <textarea className="form-control" rows="3" required placeholder="Ej: Resolución de ejercicios pág. 10"
                                        value={formData.actividad}
                                        onChange={e => setFormData({ ...formData, actividad: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label>Observaciones (Opcional)</label>
                                    <textarea className="form-control" rows="2"
                                        value={formData.observacion}
                                        onChange={e => setFormData({ ...formData, observacion: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">💾 Registrar Clase</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className={`col-md-${(isTeacher || ['admin', 'director'].includes(user.role)) ? '8' : '12'}`}>
                    <div className="glass-card p-4">
                        <h4>Historial de Clases Dictadas</h4>
                        {lessonPlans.length === 0 ? (
                            <p className="text-muted">No hay registros para esta materia.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-dark table-hover" style={{ background: 'transparent' }}>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Tema</th>
                                            <th>Actividad</th>
                                            <th>Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessonPlans.map(lp => (
                                            <tr key={lp.id}>
                                                <td style={{ whiteSpace: 'nowrap' }}>{lp.fecha}</td>
                                                <td className="fw-bold">{lp.tema}</td>
                                                <td>{lp.actividad}</td>
                                                <td className="text-muted">{lp.observacion || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonPlanModule;
