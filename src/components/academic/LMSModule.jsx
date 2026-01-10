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
    const YEARS = [2024, 2025, 2026, 2027]; // Could be dynamic

    // Data List
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const isStudentOrParent = user && ['alumno', 'padre'].includes(user.role);

    useEffect(() => {
        if (isStudentOrParent) {
            setupUserFilters();
        }
    }, [user]);

    const setupUserFilters = async () => {
        try {
            const res = await api.get('/boletin');
            if (res.data.curso) {
                console.log('LMS Auto-selecting course:', res.data.curso);
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
        tipo: 'texto',
        url: '',
        fecha_entrega: ''
    });

    const isTeacher = user && ['admin', 'profesor'].includes(user.role);

    useEffect(() => {
        fetchData();
    }, [activeTab, selectedCourse, selectedSubject, selectedYear]);

    const fetchData = async () => {
        if (!selectedCourse || !selectedSubject) return; // Wait for filters
        setLoading(true);
        console.log(`LMS Fetching ${activeTab} for ${selectedCourse}/${selectedSubject}/${selectedYear}`);
        try {
            const endpoint = activeTab === 'materiales' ? '/materiales' : '/actividades';
            const res = await api.get(endpoint, {
                params: {
                    curso: selectedCourse,
                    materia: selectedSubject,
                    ciclo_lectivo: selectedYear
                }
            });
            console.log(`LMS Data Received for ${selectedSubject}:`, res.data);
            setItems(res.data);
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
            setFormData({ titulo: '', descripcion: '', tipo: 'texto', url: '', fecha_entrega: '' });
            fetchData();
            alert('Creado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al crear');
        }
    };

    // Submission State
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

    const [assignedOptions, setAssignedOptions] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);

    useEffect(() => {
        if (isTeacher && user.role === 'profesor') { // Only fetch for professors, admin sees all
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

            // Extract unique courses
            const courses = [...new Set(res.data.map(item => item.curso))];
            setAvailableCourses(courses);
            if (courses.length > 0) setSelectedCourse(courses[0]);
            else setSelectedCourse(null); // No courses assigned

        } catch (error) {
            console.error('Error fetching assignments:', error);
            setAvailableCourses([]);
            setSelectedCourse(null);
        }
    };

    // Update subjects when course changes or assignments load
    useEffect(() => {
        if (isTeacher) {
            if (user.role === 'admin') {
                setAvailableSubjects(SUBJECTS);
                // availableCourses is already set to COURSES in the user effect for admin
            } else if (user.role === 'profesor') {
                const subjects = assignedOptions
                    .filter(item => item.curso === selectedCourse)
                    .map(item => item.materia);
                setAvailableSubjects(subjects);
                if (subjects.length > 0 && !subjects.includes(selectedSubject)) {
                    setSelectedSubject(subjects[0]);
                } else if (subjects.length === 0) {
                    setSelectedSubject(null); // No subjects for this course
                }
            }
        }
    }, [selectedCourse, assignedOptions, user]);

    return (
    // Grading State
    const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null);
    const [submissionsList, setSubmissionsList] = useState([]);
    const [gradingSubmission, setGradingSubmission] = useState(null); // { id, calificacion, devolucion }

    // Fetch submissions for an activity (Teacher)
    const handleViewSubmissions = async (activityId) => {
        setViewingSubmissionsFor(activityId);
        try {
            const res = await api.get('/entregas', { params: { ActividadId: activityId } });
            setSubmissionsList(res.data);
        } catch (error) {
            console.error(error);
            alert('Error al cargar entregas');
        }
    };

    const handleSaveGrade = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/entregas/${gradingSubmission.id}`, {
                calificacion: gradingSubmission.calificacion,
                devolucion: gradingSubmission.devolucion
            });
            alert('Calificación guardada');
            setGradingSubmission(null);
            handleViewSubmissions(viewingSubmissionsFor); // Refresh list
        } catch (error) {
            console.error(error);
            alert('Error al guardar calificación');
        }
    };

    // For students to mark if they submitted (can be improved by checking backend)
    // Actually, fetchActivities response should ideally include "mySubmission" or we fetch entregas separately.
    // simpler: fetch all my entregas and map them.
    const [mySubmissions, setMySubmissions] = useState({});

    useEffect(() => {
        if (isStudentOrParent && activeTab === 'actividades') {
            fetchMySubmissions();
        }
    }, [isStudentOrParent, activeTab]);

    const fetchMySubmissions = async () => {
        try {
            const res = await api.get('/entregas');
            // Map by ActividadId
            const map = {};
            res.data.forEach(s => {
                map[s.ActividadId] = s;
            });
            setMySubmissions(map);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-gradient">Aula Virtual (LMS)</h1>

            {/* Filters */}
            <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                <div style={{ flex: '0 0 100px' }}>
                    <label className="d-block mb-1">Ciclo</label>
                    <select className="form-control" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                {!isStudentOrParent ? (
                    <>
                        <div style={{ flex: 1 }}>
                            <label className="d-block mb-1">Curso {user.role === 'profesor' ? '(Asignado)' : ''}</label>
                            <select className="form-control" value={selectedCourse || ''} onChange={e => setSelectedCourse(e.target.value)} disabled={loading}>
                                {user.role === 'profesor' ? (
                                    availableCourses.length > 0 ?
                                        availableCourses.map(c => <option key={c} value={c}>{c}</option>) :
                                        <option value="">No hay cursos asignados</option>
                                ) : (
                                    COURSES.map(c => <option key={c} value={c}>{c}</option>)
                                )}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="d-block mb-1">Materia</label>
                            <select className="form-control" value={selectedSubject || ''} onChange={e => setSelectedSubject(e.target.value)} disabled={loading}>
                                {user.role === 'profesor' ? (
                                    availableSubjects.length > 0 ?
                                        availableSubjects.map(s => <option key={s} value={s}>{s}</option>) :
                                        <option value="">Seleccione un curso</option>
                                ) : (
                                    SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)
                                )}
                            </select>
                        </div>
                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div className="badge bg-primary p-2" style={{ fontSize: '1rem' }}>
                            🏫 Curso: {selectedCourse}
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="d-block mb-1">Cambiar Materia</label>
                            <select className="form-control" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs & Refresh */}
            <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`btn ${activeTab === 'materiales' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('materiales')}
                    >
                        📚 Material
                    </button>
                    <button
                        className={`btn ${activeTab === 'actividades' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('actividades')}
                    >
                        📝 Actividades
                    </button>
                </div>
                <button className="btn btn-outline-info" onClick={fetchData} disabled={loading}>
                    {loading ? '...' : '🔄 Actualizar Contenido'}
                </button>
            </div>

            {/* Teacher Actions */}
            {isTeacher && (
                <div className="mb-4 text-end">
                    <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : `+ Agregar ${activeTab === 'materiales' ? 'Material' : 'Actividad'}`}
                    </button>
                </div>
            )}

            {/* Creation Form */}
            {showForm && (
                <div className="glass-card mb-4 p-4 animation-fade-in">
                    <h3>Nuevo {activeTab === 'materiales' ? 'Material' : 'Actividad'}</h3>
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <input
                            placeholder="Título"
                            className="form-control"
                            value={formData.titulo}
                            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Descripción"
                            className="form-control"
                            rows="3"
                            value={formData.descripcion}
                            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                        />

                        {activeTab === 'materiales' && (
                            <>
                                <select
                                    className="form-control"
                                    value={formData.tipo}
                                    onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                >
                                    <option value="texto">Texto</option>
                                    <option value="link">Enlace Web</option>
                                    <option value="youtube">YouTube Video</option>
                                    <option value="pdf">PDF (URL)</option>
                                </select>
                                {(formData.tipo !== 'texto') && (
                                    <input
                                        placeholder="URL del recurso"
                                        className="form-control"
                                        value={formData.url}
                                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                                        required
                                    />
                                )}
                            </>
                        )}

                        {activeTab === 'actividades' && (
                            <div>
                                <label className="d-block mb-1">Fecha de Entrega</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={formData.fecha_entrega}
                                    onChange={e => setFormData({ ...formData, fecha_entrega: e.target.value })}
                                />
                            </div>
                        )}

                        <button className="btn btn-primary mt-2">Publicar</button>
                    </form>
                </div>
            )}

            {/* Submission Form (Student) */}
            {submittingId && (
                <div className="glass-card mb-4 p-4 animation-fade-in border-primary">
                    <h4 className="text-primary">📤 Enviar Entrega</h4>
                    <form onSubmit={handleSubmission} className="d-flex flex-column gap-3">
                        <input
                            placeholder="Link al archivo (Google Drive, OneDrive, etc.)"
                            className="form-control"
                            value={submissionData.archivo_url}
                            onChange={e => setSubmissionData({ ...submissionData, archivo_url: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Comentario para el profesor..."
                            className="form-control"
                            rows="2"
                            value={submissionData.comentario}
                            onChange={e => setSubmissionData({ ...submissionData, comentario: e.target.value })}
                        />
                        <div className="d-flex gap-2">
                            <button className="btn btn-success">Confirmar Envío</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setSubmittingId(null)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Submissions Viewer (Teacher) */}
            {viewingSubmissionsFor && (
                <div className="glass-card mb-4 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Entregas Recibidas</h3>
                        <button className="btn btn-sm btn-secondary" onClick={() => setViewingSubmissionsFor(null)}>Cerrar</button>
                    </div>

                    <div className="table-responsive">
                        <table className="table" style={{ color: 'var(--text-primary)' }}>
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Fecha</th>
                                    <th>Archivo</th>
                                    <th>Nota</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissionsList.map(sub => (
                                    <tr key={sub.id}>
                                        <td>{sub.Alumno?.nombre} {sub.Alumno?.apellido}</td>
                                        <td>{new Date(sub.fecha).toLocaleDateString()}</td>
                                        <td>
                                            {sub.archivo_url ? <a href={sub.archivo_url} target="_blank" rel="noreferrer">Ver Archivo</a> : 'Sin archivo'}
                                        </td>
                                        <td>
                                            {sub.calificacion ? <span className="badge bg-success">{sub.calificacion}</span> : <span className="badge bg-secondary">-</span>}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => setGradingSubmission({ id: sub.id, calificacion: sub.calificacion || '', devolucion: sub.devolucion || '' })}
                                            >
                                                Calificar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {submissionsList.length === 0 && <tr><td colSpan="5" className="text-center">No hay entregas para esta actividad.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Grading Modal/Form */}
            {gradingSubmission && (
                <div className="glass-card mb-4 p-4 border-info">
                    <h4>Calificar Entrega</h4>
                    <form onSubmit={handleSaveGrade} className="d-flex flex-column gap-3">
                        <div>
                            <label className="d-block mb-1">Nota (1-10)</label>
                            <input
                                type="number"
                                step="0.5"
                                min="1"
                                max="10"
                                className="form-control"
                                value={gradingSubmission.calificacion}
                                onChange={e => setGradingSubmission({ ...gradingSubmission, calificacion: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="d-block mb-1">Devolución / Comentarios</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={gradingSubmission.devolucion}
                                onChange={e => setGradingSubmission({ ...gradingSubmission, devolucion: e.target.value })}
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary">Guardar Nota</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setGradingSubmission(null)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="d-grid gap-3">
                {items.length === 0 && !loading && (
                    <div className="text-center p-5 glass-card">No hay contenido publicado aún para este curso y materia.</div>
                )}

                {items.map(item => {
                    const mySub = mySubmissions[item.id];
                    return (
                        <div key={item.id} className="glass-card p-3 hover-scale" style={{ borderLeft: `4px solid ${activeTab === 'materiales' ? '#2196F3' : '#FF9800'}` }}>
                            <div className="d-flex justify-content-between align-items-start">
                                <div style={{ flex: 1 }}>
                                    <h4 className="mb-1">{item.titulo}</h4>
                                    <p className="mb-2 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>{item.descripcion}</p>

                                    {item.tipo === 'link' && (
                                        <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">🔗 Abrir Enlace</a>
                                    )}
                                    {item.tipo === 'pdf' && (
                                        <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">📄 Ver PDF</a>
                                    )}
                                    {item.tipo === 'youtube' && (
                                        <div className="mt-2">
                                            <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">▶ Ver en YouTube</a>
                                        </div>
                                    )}
                                    {activeTab === 'actividades' && item.fecha_entrega && (
                                        <div className="mt-2 badge bg-warning text-dark">
                                            📅 Entrega: {item.fecha_entrega}
                                        </div>
                                    )}

                                    {/* Student Status */}
                                    {activeTab === 'actividades' && isStudentOrParent && (
                                        <div className="mt-3">
                                            {mySub ? (
                                                <div className="p-2 border rounded bg-dark">
                                                    <div>✅ Enviado el {new Date(mySub.fecha).toLocaleDateString()}</div>
                                                    {mySub.calificacion ? (
                                                        <div className="text-success fw-bold">Nota: {mySub.calificacion}</div>
                                                    ) : (
                                                        <div className="text-muted">Pendiente de corrección</div>
                                                    )}
                                                    {mySub.devolucion && <small className="d-block text-info">feedback: {mySub.devolucion}</small>}
                                                </div>
                                            ) : (
                                                user.role === 'alumno' && (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => setSubmittingId(item.id)}
                                                    >
                                                        🚀 Subir Entrega
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {/* Teacher View Submissions */}
                                    {activeTab === 'actividades' && isTeacher && (
                                        <div className="mt-3">
                                            <button className="btn btn-sm btn-info" onClick={() => handleViewSubmissions(item.id)}>
                                                📂 Ver Entregas
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <small className="text-muted ms-3" style={{ minWidth: '80px', textAlign: 'right' }}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LMSModule;
