import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from './constants';

const CommunicationsModule = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('recibidos'); // recibidos, enviar
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        titulo: '',
        mensaje: '',
        tipo: 'general', // general, individual, llamado_atencion
        destinatario_curso: COURSES[0],
        AlumnoId: ''
    });

    const [students, setStudents] = useState([]);

    const isStaff = user && ['admin', 'director', 'jefe_preceptores'].includes(user.role);
    const isPreceptor = user && user.role === 'preceptor'; // Can see but maybe not send? User said "seen by preceptors". I'll allow viewing.

    useEffect(() => {
        fetchMessages();
        if (isStaff) {
            fetchStudents();
        }
    }, [activeTab]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await api.get('/comunicados');
            setMessages(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const fetchStudents = async () => {
        try {
            const res = await api.get('/alumnos');
            setStudents(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/comunicados', formData);
            alert('Comunicado enviado correctamente');
            setFormData({ ...formData, titulo: '', mensaje: '', AlumnoId: '' });
            fetchMessages();
        } catch (error) {
            console.error(error);
            alert('Error al enviar comunicado');
        }
    };

    const getBadgeColor = (tipo) => {
        switch (tipo) {
            case 'general': return 'bg-info text-dark';
            case 'individual': return 'bg-primary';
            case 'llamado_atencion': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-gradient">Comunicaciones y Sanciones</h1>

            {/* Tabs */}
            <div className="mb-4 d-flex gap-2">
                <button
                    className={`btn ${activeTab === 'recibidos' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('recibidos')}
                >
                    📬 Buzón de Mensajes
                </button>
                {isStaff && (
                    <button
                        className={`btn ${activeTab === 'enviar' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('enviar')}
                    >
                        📢 Nuevo Comunicado
                    </button>
                )}
            </div>

            {/* List */}
            {activeTab === 'recibidos' && (
                <div className="d-grid gap-3">
                    {messages.length === 0 && <div className="glass-card p-4 text-center">No hay comunicados.</div>}
                    {messages.map(msg => (
                        <div key={msg.id} className="glass-card p-3" style={{ borderLeft: `5px solid ${msg.tipo === 'llamado_atencion' ? '#ff4d4d' : '#2196F3'}` }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <span className={`badge ${getBadgeColor(msg.tipo)} me-2`}>
                                        {msg.tipo === 'llamado_atencion' ? '⚠️ LLAMADO DE ATENCIÓN' : msg.tipo.toUpperCase()}
                                    </span>
                                    <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
                                </div>
                                <small className="text-secondary">De: {msg.Emisor?.email}</small>
                            </div>
                            <h4 className="mb-2">{msg.titulo}</h4>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{msg.mensaje}</p>

                            {msg.tipo === 'general' && <small className="d-block mt-2 text-info">Para: Curso {msg.destinatario_curso}</small>}
                            {msg.DestinatarioAlumno && (
                                <small className="d-block mt-2 text-primary">
                                    Para: {msg.DestinatarioAlumno.nombre} {msg.DestinatarioAlumno.apellido} ({msg.DestinatarioAlumno.curso})
                                </small>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Send Form */}
            {activeTab === 'enviar' && isStaff && (
                <div className="glass-card p-4">
                    <h3>Redactar Nuevo Comunicado</h3>
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-3">
                        <div>
                            <label className="d-block mb-1">Tipo de Comunicación</label>
                            <select
                                className="form-control"
                                value={formData.tipo}
                                onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                            >
                                <option value="general">📢 General (Por Curso)</option>
                                <option value="individual">📩 Mensaje Individual</option>
                                <option value="llamado_atencion">⚠️ Llamado de Atención (Sanción)</option>
                            </select>
                        </div>

                        {formData.tipo === 'general' && (
                            <div>
                                <label className="d-block mb-1">Curso Destino</label>
                                <select
                                    className="form-control"
                                    value={formData.destinatario_curso}
                                    onChange={e => setFormData({ ...formData, destinatario_curso: e.target.value })}
                                >
                                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        )}

                        {(formData.tipo === 'individual' || formData.tipo === 'llamado_atencion') && (
                            <div>
                                <label className="d-block mb-1">Alumno Destinatario</label>
                                <select
                                    className="form-control"
                                    value={formData.AlumnoId}
                                    onChange={e => setFormData({ ...formData, AlumnoId: e.target.value })}
                                    required
                                >
                                    <option value="">Seleccionar Alumno...</option>
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.apellido}, {s.nombre} ({s.curso})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="d-block mb-1">Título / Asunto</label>
                            <input
                                className="form-control"
                                value={formData.titulo}
                                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                required
                                placeholder="Ej: Reunion de Padres o Sanción Disciplinaria"
                            />
                        </div>

                        <div>
                            <label className="d-block mb-1">Mensaje / Detalle</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                value={formData.mensaje}
                                onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                                required
                                placeholder="Escriba el contenido aquí..."
                            />
                        </div>

                        <button className={`btn btn-lg ${formData.tipo === 'llamado_atencion' ? 'btn-danger' : 'btn-primary'}`}>
                            {formData.tipo === 'llamado_atencion' ? '🚨 Aplicar Sanción / Aviso' : 'Enviar Comunicado'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CommunicationsModule;
