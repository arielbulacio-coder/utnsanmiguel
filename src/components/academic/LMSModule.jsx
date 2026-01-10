import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const LMSModule = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('materiales');
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Expanded Accordions State
    const [expandedTrimesters, setExpandedTrimesters] = useState({ 1: true, 2: false, 3: false });

    // Data List
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const isStudentOrParent = user && ['alumno', 'padre'].includes(user.role);
    const isTeacher = user && ['admin', 'profesor'].includes(user.role);
    const YEARS = [2024, 2025, 2026, 2027];

    useEffect(() => {
        if (isStudentOrParent) {
            setupUserFilters();
        }
    }, [user]);

    const setupUserFilters = async () => {
        try {
            const res = await api.get('/boletin');
            if (res.data.curso) {
                setSelectedCourse(res.data.curso);
            }
        } catch (err) {
            console.error('Error auto-selecting LMS course:', err);
        }
    };

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        tipo: 'texto', // para materiales
        url: '', // para materiales
        fecha_entrega: '', // para actividades
        trimestre: 1,
        unidad: '',
        visible: true
    });

    useEffect(() => {
        fetchData();
    }, [activeTab, selectedCourse, selectedSubject, selectedYear]);

    const fetchData = async () => {
        if (!selectedCourse || !selectedSubject) return;
        setLoading(true);
        try {
            const endpoint = activeTab === 'materiales' ? '/materiales' : '/actividades';
            const res = await api.get(endpoint, {
                params: {
                    curso: selectedCourse,
                    materia: selectedSubject,
                    ciclo_lectivo: selectedYear
                }
            });
            // Ordenar por unidad y fecha
            const sorted = res.data.sort((a, b) => (a.trimestre - b.trimestre) || (a.unidad > b.unidad ? 1 : -1));
            setItems(sorted);
        } catch (error) {
            console.error('LMS Error:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = activeTab === 'materiales' ? '/materiales' : '/actividades';

        try {
            await api.post(endpoint, {
                ...formData,
                curso: selectedCourse,
                materia: selectedSubject,
                ciclo_lectivo: selectedYear
            });
            setShowForm(false);
            setFormData({
                titulo: '', descripcion: '', tipo: 'texto', url: '', fecha_entrega: '',
                trimestre: 1, unidad: '', visible: true
            });
            fetchData();
            alert('Creado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al crear');
        }
    };

    const toggleVisibility = async (item) => {
        const endpoint = activeTab === 'materiales' ? `/materiales/${item.id}` : `/actividades/${item.id}`;
        // Simular switch localmente primero para UX
        const newVisible = !item.visible;
        try {
            // Nota: Se asume que existe endpoint PUT/PATCH para actualizar visible.
            // Si no existe, esto fallará. Deberíamos agregarlo al backend o usar un endpoint genérico update.
            // Por ahora asumimos que el backend lo soporta o lo implementaremos.
            await api.put(endpoint, { visible: newVisible });
            fetchData(); // Recargar para confirmar
        } catch (error) {
            console.error('Error updating visibility', error);
            alert('No se pudo actualizar la visibilidad');
        }
    };

    // Submission Logic
    const [submittingId, setSubmittingId] = useState(null);
    const [submissionData, setSubmissionData] = useState({ archivo_url: '', comentario: '' });

    const handleSubmission = async (e) => {
        e.preventDefault();
        try {
            await api.post('/entregas', {
                ActividadId: submittingId,
                ...submissionData,
                ciclo_lectivo: selectedYear
            });
            alert('Entrega enviada correctamente');
            setSubmittingId(null);
            setSubmissionData({ archivo_url: '', comentario: '' });
        } catch (error) {
            console.error(error);
            alert('Error al enviar entrega');
        }
    };

    // Teacher Assignments Logic
    const [availableCourses, setAvailableCourses] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [assignedOptions, setAssignedOptions] = useState([]);

    useEffect(() => {
        if (isTeacher && user.role === 'profesor') {
            fetchAssignments();
        } else if (user && user.role === 'admin') {
            setAvailableCourses(COURSES);
            setAvailableSubjects(SUBJECTS);
        }
    }, [user]);

    const fetchAssignments = async () => {
        try {
            const res = await api.get('/profesor/asignaciones');
            setAssignedOptions(res.data);
            const courses = [...new Set(res.data.map(item => item.curso))];
            setAvailableCourses(courses);
            if (courses.length > 0) setSelectedCourse(courses[0]);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    useEffect(() => {
        if (isTeacher && user.role === 'profesor') {
            const subjects = assignedOptions
                .filter(item => item.curso === selectedCourse)
                .map(item => item.materia);
            setAvailableSubjects(subjects);
            if (subjects.length > 0 && !subjects.includes(selectedSubject)) {
                setSelectedSubject(subjects[0]);
            }
        }
    }, [selectedCourse, assignedOptions, user]);

    // Grading Logic
    const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null);
    const [submissionsList, setSubmissionsList] = useState([]);
    const [gradingSubmission, setGradingSubmission] = useState(null);

    const handleViewSubmissions = async (activityId) => {
        setViewingSubmissionsFor(activityId);
        try {
            const res = await api.get('/entregas', { params: { ActividadId: activityId } });
            setSubmissionsList(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveGrade = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/entregas/${gradingSubmission.id}`, {
                calificacion: gradingSubmission.calificacion,
                devolucion: gradingSubmission.devolucion
            });
            setGradingSubmission(null);
            handleViewSubmissions(viewingSubmissionsFor);
        } catch (error) {
            alert('Error al guardar calificación');
        }
    };

    // My Submissions (Student)
    const [mySubmissions, setMySubmissions] = useState({});

    useEffect(() => {
        if (isStudentOrParent && activeTab === 'actividades') {
            fetchMySubmissions();
        }
    }, [isStudentOrParent, activeTab]);

    const fetchMySubmissions = async () => {
        try {
            const res = await api.get('/entregas');
            const map = {};
            res.data.forEach(s => { map[s.ActividadId] = s; });
            setMySubmissions(map);
        } catch (error) { console.error(error); }
    };

    // --- RENDER HELPERS ---
    const renderTrimesterSection = (trimester) => {
        const trimesterItems = items.filter(i => i.trimestre === trimester);
        // Only show visible items for students
        const visibleItems = isTeacher ? trimesterItems : trimesterItems.filter(i => i.visible !== false);

        if (visibleItems.length === 0) return null;

        const isExpanded = expandedTrimesters[trimester];

        return (
            <div className="mb-4 glass-card overflow-hidden">
                <div
                    className="p-3 d-flex justify-content-between align-items-center cursor-pointer"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
                    onClick={() => setExpandedTrimesters(prev => ({ ...prev, [trimester]: !prev[trimester] }))}
                >
                    <h3 className="m-0 text-gradient">{trimester}° Trimestre</h3>
                    <span>{isExpanded ? '▼' : '▶'}</span>
                </div>

                {isExpanded && (
                    <div className="p-3">
                        {visibleItems.map(item => {
                            const mySub = mySubmissions[item.id];
                            const isActivity = activeTab === 'actividades';
                            return (
                                <div key={item.id} className="mb-3 p-3 glass-card hover-glow" style={{ borderLeft: `4px solid ${isActivity ? '#ff9800' : '#03a9f4'}` }}>
                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                        <div style={{ flex: 1 }}>
                                            {item.unidad && <span className="badge bg-secondary mb-2">{item.unidad}</span>}
                                            <h4 className="mb-1 d-flex align-items-center gap-2">
                                                {item.titulo}
                                                {isTeacher && !item.visible && <span className="badge bg-danger" style={{ FontSize: '0.7em' }}>Oculto</span>}
                                            </h4>
                                            <p className="text-secondary mb-2" style={{ whiteSpace: 'pre-wrap' }}>{item.descripcion}</p>

                                            {/* Resource Links */}
                                            <div className="d-flex gap-2 flex-wrap">
                                                {item.url && (
                                                    <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-light">
                                                        {item.tipo === 'youtube' ? '📺 Ver Video' : item.tipo === 'pdf' ? '📄 Ver PDF' : '🔗 Abrir Recurso'}
                                                    </a>
                                                )}
                                                {isActivity && item.fecha_entrega && (
                                                    <div className="badge bg-warning text-dark d-flex align-items-center">📅 Entrega: {item.fecha_entrega}</div>
                                                )}
                                            </div>

                                            {/* Activity Interactions */}
                                            {isActivity && (
                                                <div className="mt-3">
                                                    {isStudentOrParent && (
                                                        mySub ? (
                                                            <div className="p-2 border rounded bg-dark bg-opacity-50">
                                                                <div className="text-success">✅ Enviado el {new Date(mySub.fecha).toLocaleDateString()}</div>
                                                                {mySub.calificacion ? (
                                                                    <div className="fw-bold text-light mt-1">Nota: <span className={parseFloat(mySub.calificacion) >= 6 ? 'text-success' : 'text-danger'}>{mySub.calificacion}</span></div>
                                                                ) : <small className="text-muted">Pendiente de corrección</small>}
                                                                {mySub.devolucion && <div className="mt-1 text-info small">Feedback: {mySub.devolucion}</div>}
                                                            </div>
                                                        ) : (
                                                            user.role === 'alumno' && (
                                                                <button className="btn btn-sm btn-primary" onClick={() => setSubmittingId(item.id)}>🚀 Subir Entrega</button>
                                                            )
                                                        )
                                                    )}

                                                    {isTeacher && (
                                                        <div className="d-flex gap-2 mt-2">
                                                            <button className="btn btn-sm btn-info" onClick={() => handleViewSubmissions(item.id)}>📂 Ver Entregas</button>
                                                            {/* Toggle Visibility Button could go here */}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {/* Teacher Controls */}
                                        {isTeacher && (
                                            <div className="d-flex flex-column gap-1">
                                                <button className={`btn btn-sm ${item.visible ? 'btn-outline-secondary' : 'btn-outline-danger'}`} onClick={(e) => { e.stopPropagation(); toggleVisibility(item); }}>
                                                    {item.visible ? '👁️ Visible' : '🔒 Oculto'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
            <h1 className="mb-4 text-center text-gradient display-5 fw-bold">Aula Virtual</h1>

            {/* Filters Bar */}
            <div className="glass-card p-3 mb-4 d-flex flex-wrap gap-3 align-items-end justify-content-center">
                <div style={{ minWidth: '100px' }}>
                    <label className="small text-muted mb-1">Ciclo</label>
                    <select className="form-control form-control-sm" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>

                {(!isStudentOrParent || user.role === 'admin') && (
                    <>
                        <div style={{ minWidth: '200px' }}>
                            <label className="small text-muted mb-1">Curso</label>
                            <select className="form-control form-control-sm" value={selectedCourse || ''} onChange={e => setSelectedCourse(e.target.value)} disabled={loading}>
                                {isTeacher && user.role === 'profesor' ? (
                                    availableCourses.length ? availableCourses.map(c => <option key={c} value={c}>{c}</option>) : <option value="">Sin asignaciones</option>
                                ) : (
                                    COURSES.map(c => <option key={c} value={c}>{c}</option>)
                                )}
                            </select>
                        </div>
                        <div style={{ minWidth: '250px' }}>
                            <label className="small text-muted mb-1">Materia</label>
                            <select className="form-control form-control-sm" value={selectedSubject || ''} onChange={e => setSelectedSubject(e.target.value)} disabled={loading}>
                                {isTeacher && user.role === 'profesor' ? (
                                    availableSubjects.length ? availableSubjects.map(s => <option key={s} value={s}>{s}</option>) : <option value="">Seleccione curso</option>
                                ) : (
                                    SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)
                                )}
                            </select>
                        </div>
                    </>
                )}

                {isStudentOrParent && (
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                        <div className="badge bg-primary fs-6 p-2">Curso: {selectedCourse}</div>
                        <div style={{ flex: 1 }}>
                            <label className="small text-muted mb-1">Materia</label>
                            <select className="form-control form-control-sm" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Tabs */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                <button
                    className={`btn px-4 ${activeTab === 'materiales' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('materiales')}
                >
                    📚 Material de Estudio
                </button>
                <button
                    className={`btn px-4 ${activeTab === 'actividades' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('actividades')}
                >
                    📝 Actividades y TPs
                </button>
            </div>

            {/* Teacher Toolbar */}
            {isTeacher && (
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                        {showForm ? '✖ Cancelar' : '➕ Nuevo Contenido'}
                    </button>
                </div>
            )}

            {/* Creation Form */}
            {showForm && (
                <div className="glass-card p-4 mb-4 animation-fade-in border-success" style={{ borderLeft: '5px solid #2ecc71' }}>
                    <h4 className="mb-3">Crear {activeTab === 'materiales' ? 'Material' : 'Actividad'}</h4>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-9">
                            <label className="form-label">Título</label>
                            <input className="form-control" value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Trimestre</label>
                            <select className="form-control" value={formData.trimestre} onChange={e => setFormData({ ...formData, trimestre: parseInt(e.target.value) })}>
                                <option value="1">1° Trimestre</option>
                                <option value="2">2° Trimestre</option>
                                <option value="3">3° Trimestre</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Unidad / Tema</label>
                            <input className="form-control" placeholder="Ej: Unidad 1" value={formData.unidad} onChange={e => setFormData({ ...formData, unidad: e.target.value })} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Descripción</label>
                            <textarea className="form-control" rows="3" value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                        </div>

                        {activeTab === 'materiales' ? (
                            <>
                                <div className="col-md-4">
                                    <label className="form-label">Tipo de Recurso</label>
                                    <select className="form-control" value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })}>
                                        <option value="texto">Solo Texto</option>
                                        <option value="link">Enlace Web</option>
                                        <option value="youtube">Video YouTube</option>
                                        <option value="pdf">Documento PDF</option>
                                    </select>
                                </div>
                                {formData.tipo !== 'texto' && (
                                    <div className="col-md-8">
                                        <label className="form-label">URL del Recurso</label>
                                        <input className="form-control" placeholder="https://..." value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} required />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="col-md-6">
                                <label className="form-label">Fecha de Entrega</label>
                                <input type="date" className="form-control" value={formData.fecha_entrega} onChange={e => setFormData({ ...formData, fecha_entrega: e.target.value })} />
                            </div>
                        )}

                        <div className="col-12 text-end">
                            <button className="btn btn-primary px-4">Publicar Contenido</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Submission Form Overlay */}
            {submittingId && (
                <div className="modal-overlay">
                    <div className="glass-card p-4 mx-auto" style={{ maxWidth: '500px', marginTop: '10vh' }}>
                        <h4 className="mb-3">📤 Entregar Actividad</h4>
                        <form onSubmit={handleSubmission}>
                            <div className="mb-3">
                                <label className="form-label">Enlace al trabajo (Drive/OneDrive)</label>
                                <input className="form-control" placeholder="https://" value={submissionData.archivo_url} onChange={e => setSubmissionData({ ...submissionData, archivo_url: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comentarios</label>
                                <textarea className="form-control" rows="3" value={submissionData.comentario} onChange={e => setSubmissionData({ ...submissionData, comentario: e.target.value })} />
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-secondary" onClick={() => setSubmittingId(null)}>Cancelar</button>
                                <button className="btn btn-success">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Teacher Grading View Overlay */}
            {viewingSubmissionsFor && (
                <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.8)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, overflowY: 'auto' }}>
                    <div className="container mt-5">
                        <div className="glass-card p-4 position-relative">
                            <button className="btn btn-sm btn-light position-absolute top-0 end-0 m-3" onClick={() => setViewingSubmissionsFor(null)}>✕ Cerrar</button>
                            <h3 className="mb-4">Entregas de Alumnos</h3>
                            <div className="table-responsive">
                                <table className="table text-light">
                                    <thead><tr><th>Alumno</th><th>Fecha</th><th>Link</th><th>Nota</th><th>Acción</th></tr></thead>
                                    <tbody>
                                        {submissionsList.map(s => (
                                            <tr key={s.id}>
                                                <td>{s.Alumno?.apellido}, {s.Alumno?.nombre}</td>
                                                <td>{new Date(s.fecha).toLocaleDateString()}</td>
                                                <td><a href={s.archivo_url} target="_blank" rel="noreferrer" className="text-info">Ver Archivo</a></td>
                                                <td className="fw-bold">{s.calificacion || '-'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-warning" onClick={() => setGradingSubmission({ id: s.id, calificacion: s.calificacion || '', devolucion: s.devolucion || '' })}>Calificar</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {submissionsList.length === 0 && <tr><td colSpan="5" className="text-center py-4">No hay entregas recibidas.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Grading Form Modal */}
            {gradingSubmission && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card p-4" style={{ width: '400px' }}>
                        <h4 className="mb-3">Calificar y Devolver</h4>
                        <form onSubmit={handleSaveGrade}>
                            <div className="mb-2">
                                <label>Calificación (Numérica)</label>
                                <input type="number" step="0.5" className="form-control" value={gradingSubmission.calificacion} onChange={e => setGradingSubmission({ ...gradingSubmission, calificacion: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label>Devolución (Feedback)</label>
                                <textarea className="form-control" rows="4" value={gradingSubmission.devolucion} onChange={e => setGradingSubmission({ ...gradingSubmission, devolucion: e.target.value })} />
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">Guardar Nota</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setGradingSubmission(null)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content Render */}
            <div className="content-area">
                {!loading && items.length === 0 && <div className="text-center p-5 opacity-50">Selecciona un curso y materia para ver el contenido.</div>}

                {renderTrimesterSection(1)}
                {renderTrimesterSection(2)}
                {renderTrimesterSection(3)}
            </div>
        </div>
    );
};

export default LMSModule;
