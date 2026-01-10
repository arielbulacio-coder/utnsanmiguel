import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const CurriculumManager = () => {
    const { user } = useAuth();
    const [years] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [selectedYear, setSelectedYear] = useState(1);

    const [subjects, setSubjects] = useState([]); // All available subjects
    const [curriculum, setCurriculum] = useState([]); // Plan mappings
    const [currentCourses, setCurrentCourses] = useState([]); // Existing courses

    const [loading, setLoading] = useState(false);
    const [assignmentsLoading, setAssignmentsLoading] = useState(false);

    // Form inputs
    const [selectedSubject, setSelectedSubject] = useState('');
    const [newDivision, setNewDivision] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resS, resCurr, resCursos] = await Promise.all([
                api.get('/materias'),
                api.get('/curricula'),
                api.get('/cursos')
            ]);
            setSubjects(resS.data);
            setCurriculum(resCurr.data);
            setCurrentCourses(resCursos.data);

            if (resS.data.length > 0) setSelectedSubject(resS.data[0].nombre);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    // --- CURRICULUM (MATERIAS) ---
    const handleAssignMateria = async () => {
        if (!selectedSubject) return;
        setAssignmentsLoading(true);
        try {
            await api.post('/curricula', {
                anio: selectedYear,
                materia: selectedSubject
            });
            fetchData(); // Refresh all
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Error al asignar'));
        }
        setAssignmentsLoading(false);
    };

    const handleDeleteMateria = async (id) => {
        if (!window.confirm('¿Quitar materia del plan de este año?')) return;
        try {
            await api.delete(`/curricula/${id}`);
            fetchData();
        } catch (error) {
            alert('Error al eliminar');
        }
    };

    // --- CURSOS (DIVISIONES) ---
    const handleCreateCourse = async () => {
        if (!newDivision.trim()) return;
        const div = newDivision.trim().toUpperCase();
        setAssignmentsLoading(true);
        try {
            await api.post('/cursos/generar', {
                anio: selectedYear,
                division: div
            });
            setNewDivision('');
            fetchData();
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Error al crear curso'));
        }
        setAssignmentsLoading(false);
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm('¿Eliminar este curso completo?')) return;
        try {
            await api.delete(`/cursos/${id}`);
            fetchData();
        } catch (error) {
            alert('Error eliminando curso');
        }
    };

    if (!['admin', 'director', 'vicedirector', 'secretario'].includes(user?.role)) {
        return <div className="p-4 text-center">Acceso Denegado</div>;
    }

    // Filtered Data for View
    const yearSubjects = curriculum.filter(c => c.anio === selectedYear);
    const yearCourses = currentCourses.filter(c => c.anio === selectedYear || c.nombre.startsWith(`${selectedYear}°`) || c.nombre.startsWith(`${selectedYear} `));
    // Fallback filter by string logic if 'anio' is null in legacy data

    return (
        <div className="container p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="text-center mb-4 text-gradient">Plan de Estudios y Divisiones</h1>

            {/* Year Selector Tabs */}
            <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
                {years.map(y => (
                    <button
                        key={y}
                        className={`btn px-4 py-2 ${selectedYear === y ? 'btn-primary' : 'btn-dark border-secondary'}`}
                        onClick={() => setSelectedYear(y)}
                    >
                        {y}° AÑO
                    </button>
                ))}
            </div>

            <div className="row">
                {/* LEFT: MATERIAS DEL AÑO */}
                <div className="col-md-7 mb-4">
                    <div className="glass-card p-4 h-100">
                        <h3 className="mb-3 d-flex justify-content-between align-items-center">
                            <span>📚 Materias de {selectedYear}° Año</span>
                            <span className="badge bg-info">{yearSubjects.length} Materias</span>
                        </h3>
                        <p className="text-muted-responsive small">Define qué materias cursan todos los alumnos de este año.</p>

                        <div className="d-flex gap-2 mb-4">
                            <select
                                className="form-control"
                                value={selectedSubject}
                                onChange={e => setSelectedSubject(e.target.value)}
                            >
                                {subjects.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                            </select>
                            <button className="btn btn-success" onClick={handleAssignMateria} disabled={assignmentsLoading}>
                                + Asignar
                            </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                            {yearSubjects.map(m => (
                                <div key={m.id} className="badge bg-secondary p-2 d-flex align-items-center gap-2 shadow-sm">
                                    <span style={{ fontSize: '1rem', color: '#fff' }}>{m.materia}</span>
                                    <button
                                        className="btn btn-sm p-0 text-danger fw-bold"
                                        style={{ lineHeight: 1, border: 'none', background: 'transparent' }}
                                        onClick={() => handleDeleteMateria(m.id)}
                                    >✕</button>
                                </div>
                            ))}
                            {yearSubjects.length === 0 && <span className="text-muted-responsive fst-italic">No hay materias asignadas a este año.</span>}
                        </div>
                    </div>
                </div>

                {/* RIGHT: DIVISIONES (CURSOS) */}
                <div className="col-md-5 mb-4">
                    <div className="glass-card p-4 h-100" style={{ borderLeft: '4px solid #9c27b0' }}>
                        <h3 className="mb-3">🏫 Divisiones de {selectedYear}° Año</h3>
                        <p className="text-muted-responsive small">Gestiona las divisiones habilitadas (A, B, C...).</p>

                        <div className="d-flex gap-2 mb-4 align-items-center">
                            <span className="fw-bold">{selectedYear}°</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="División (ej: A)"
                                value={newDivision}
                                onChange={e => setNewDivision(e.target.value)}
                                style={{ maxWidth: '100px', textTransform: 'uppercase' }}
                                maxLength={2}
                            />
                            <button className="btn btn-primary" onClick={handleCreateCourse} disabled={assignmentsLoading}>
                                Crear Curso
                            </button>
                        </div>

                        <ul className="list-group">
                            {yearCourses.map(c => (
                                <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-5">{c.nombre}</span>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCourse(c.id)}>Eliminar</button>
                                </li>
                            ))}
                            {yearCourses.length === 0 && <li className="list-group-item text-muted-responsive">No hay divisiones creadas.</li>}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="alert alert-info mt-4">
                ℹ️ <strong>Información:</strong> Al asignar materias al {selectedYear}° Año, estas se aplicarán automáticamente a todas sus divisiones ({yearCourses.map(c => c.nombre).join(', ') || 'ninguna'}) para la carga de notas y asistencia.
            </div>

            {/* RESUMEN GLOBAL */}
            <div className="mt-5">
                <div className="glass-card p-4">
                    <h3 className="mb-4 text-center border-bottom pb-3" style={{ borderColor: 'var(--glass-border)' }}>Vista General del Plan de Estudios</h3>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: '100px' }}>Año</th>
                                    <th>Materias Asignadas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {years.map(y => {
                                    const mats = curriculum.filter(c => c.anio === y);
                                    return (
                                        <tr key={y} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td className="align-middle text-center">
                                                <div className="fs-4 fw-bold text-primary">{y}°</div>
                                            </td>
                                            <td className="align-middle py-3">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {mats.length > 0 ? mats.map(m => (
                                                        <div key={m.id} className="badge bg-dark border border-secondary p-2 d-flex align-items-center gap-2">
                                                            <span className="text-responsive" style={{ fontSize: '0.9rem' }}>{m.materia}</span>
                                                            <button
                                                                className="btn btn-sm p-0 text-danger fw-bold hover-scale"
                                                                style={{ lineHeight: 1, border: 'none', background: 'transparent', fontSize: '1.2em' }}
                                                                title="Eliminar materia"
                                                                onClick={() => handleDeleteMateria(m.id)}
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    )) : (
                                                        <span className="text-muted-responsive small fst-italic opacity-50">
                                                            --- Sin materias asignadas ---
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurriculumManager;
