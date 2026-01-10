import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const CurriculumManager = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [curriculum, setCurriculum] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resC, resS, resCurr] = await Promise.all([
                api.get('/cursos'),
                api.get('/materias'),
                api.get('/curricula')
            ]);
            setCourses(resC.data);
            setSubjects(resS.data);
            setCurriculum(resCurr.data);

            if (resC.data.length > 0) setSelectedCourse(resC.data[0].nombre);
            if (resS.data.length > 0) setSelectedSubject(resS.data[0].nombre);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleAssign = async () => {
        if (!selectedCourse || !selectedSubject) return;
        setLoading(true);
        try {
            await api.post('/curricula', {
                curso: selectedCourse,
                materia: selectedSubject
            });
            fetchData();
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Error al asignar'));
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Quitar materia del curso?')) return;
        try {
            await api.delete(`/curricula/${id}`);
            fetchData();
        } catch (error) {
            alert('Error al eliminar');
        }
    };

    // Filter curriculum by currently viewed course logic if list gets too long?
    // For now simple list.

    if (!['admin', 'director', 'vicedirector', 'secretario'].includes(user?.role)) {
        return <div className="p-4 text-center">Acceso Denegado</div>;
    }

    return (
        <div className="container p-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="text-center mb-5">Plan de Estudios (Curricula)</h1>

            <div className="glass-card mb-4 p-4">
                <h3>Asignar Materias a Cursos</h3>
                <p className="text-muted">Define qué materias pertenecen a cada año/división.</p>
                <div className="d-flex gap-2 flex-wrap align-items-end">
                    <div style={{ flex: 1 }}>
                        <label>Curso</label>
                        <select className="form-control" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                            {courses.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Materia</label>
                        <select className="form-control" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                            {subjects.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleAssign} disabled={loading}>
                        Asignar Materia al Plan
                    </button>
                </div>
            </div>

            <div className="glass-card p-4">
                <h3>Estructura Curricular Vigente</h3>
                <div className="accordion" id="accordionCurriculum">
                    {courses.map(c => {
                        const materiasDelCurso = curriculum.filter(x => x.curso === c.nombre);
                        if (materiasDelCurso.length === 0) return null;

                        return (
                            <div className="mb-3" key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <h4 style={{ color: 'var(--primary-color)' }}>{c.nombre}</h4>
                                <div className="d-flex flex-wrap gap-2">
                                    {materiasDelCurso.map(m => (
                                        <span key={m.id} className="badge bg-secondary d-flex align-items-center gap-2 p-2">
                                            {m.materia}
                                            <span
                                                style={{ cursor: 'pointer', color: '#ffaaaa' }}
                                                onClick={() => handleDelete(m.id)}
                                                title="Quitar del plan"
                                            >
                                                ✕
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CurriculumManager;
