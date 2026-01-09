import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES, SUBJECTS } from './constants';

const LMSModule = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('materiales');
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);

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
    }, [activeTab, selectedCourse, selectedSubject]);

    const fetchData = async () => {
        if (!selectedCourse || !selectedSubject) return; // Wait for filters
        setLoading(true);
        console.log(`LMS Fetching ${activeTab} for ${selectedCourse}/${selectedSubject}`);
        try {
            const endpoint = activeTab === 'materiales' ? '/materiales' : '/actividades';
            const res = await api.get(endpoint, {
                params: {
                    curso: selectedCourse,
                    materia: selectedSubject
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
                materia: selectedSubject
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

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-gradient">Aula Virtual (LMS)</h1>

            {/* Filters */}
            <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                {!isStudentOrParent ? (
                    <>
                        <div style={{ flex: 1 }}>
                            <label className="d-block mb-1">Curso</label>
                            <select className="form-control" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="d-block mb-1">Materia</label>
                            <select className="form-control" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
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

            {/* Tabs */}
            <div className="mb-4" style={{ display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'materiales' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('materiales')}
                >
                    📚 Material de Estudio
                </button>
                <button
                    className={`btn ${activeTab === 'actividades' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('actividades')}
                >
                    📝 Actividades / Tareas
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

            {/* Form */}
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

            {/* List */}
            <div className="d-grid gap-3">
                {items.length === 0 && !loading && (
                    <div className="text-center p-5 glass-card">No hay contenido publicado aún para este curso y materia.</div>
                )}

                {items.map(item => (
                    <div key={item.id} className="glass-card p-3 hover-scale" style={{ borderLeft: `4px solid ${activeTab === 'materiales' ? '#2196F3' : '#FF9800'}` }}>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
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
                            </div>
                            <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LMSModule;
