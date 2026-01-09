import React, { useState, useEffect } from 'react';
import api from '../../api';
import { COURSES } from './constants';
import { useAuth } from '../../context/AuthContext';

const StudentsManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null); // Para ver trayectoria

    // Form State
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellido: '',
        email: '',
        email_padre: '',
        legajo: '',
        curso: COURSES[0]
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/alumnos');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            alert('Error al cargar alumnos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/alumnos', newStudent);
            alert('Alumno registrado correctamente');
            setShowForm(false);
            setNewStudent({ nombre: '', apellido: '', email: '', email_padre: '', legajo: '', curso: COURSES[0] });
            fetchStudents();
        } catch (error) {
            console.error('Error creating student:', error);
            alert('Error al crear alumno');
        }
    };

    const filteredStudents = selectedCourse
        ? students.filter(s => s.curso === selectedCourse)
        : students;

    if (!['admin', 'director', 'secretario', 'jefe_preceptores'].includes(user?.role)) {
        return <div className="p-5 text-center">No tienes permisos para acceder a esta sección.</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: 'var(--text-primary)' }}>Gestión de Estudiantes</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                    style={{ background: 'var(--button-bg)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px' }}
                >
                    {showForm ? '✖ Cerrar Formulario' : '+ Nuevo Alumno'}
                </button>
            </div>

            {/* Formulario de Registro */}
            {showForm && (
                <div className="glass-card mb-4" style={{ padding: '2rem', animation: 'fadeIn 0.3s ease' }}>
                    <h3 className="mb-3">Registrar Nuevo Alumno</h3>
                    <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input className="form-control" placeholder="Nombre" value={newStudent.nombre} onChange={e => setNewStudent({ ...newStudent, nombre: e.target.value })} required />
                        <input className="form-control" placeholder="Apellido" value={newStudent.apellido} onChange={e => setNewStudent({ ...newStudent, apellido: e.target.value })} required />
                        <input className="form-control" placeholder="Email Alumno" type="email" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} required />
                        <input className="form-control" placeholder="Email Padre/Tutor" type="email" value={newStudent.email_padre} onChange={e => setNewStudent({ ...newStudent, email_padre: e.target.value })} />
                        <input className="form-control" placeholder="Legajo" value={newStudent.legajo} onChange={e => setNewStudent({ ...newStudent, legajo: e.target.value })} required />

                        <select className="form-control" value={newStudent.curso} onChange={e => setNewStudent({ ...newStudent, curso: e.target.value })}>
                            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <button type="submit" className="btn btn-success" style={{ gridColumn: 'span 2' }}>Guardar Alumno</button>
                    </form>
                </div>
            )}

            {/* Listado de Alumnos */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Listado de Alumnos</h3>
                    <select
                        className="form-control"
                        style={{ maxWidth: '200px' }}
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Todos los Cursos</option>
                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Curso</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Legajo</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Apellido y Nombre</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Contacto</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}><span className="badge bg-secondary">{student.curso || '-'}</span></td>
                                        <td style={{ padding: '1rem' }}>{student.legajo}</td>
                                        <td style={{ padding: '1rem' }}>{student.apellido}, {student.nombre}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontSize: '0.85rem' }}>{student.email}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{student.email_padre}</div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => setSelectedStudent(student)}
                                                style={{ marginRight: '0.5rem' }}
                                            >
                                                👤 Trayectoria
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4">No se encontraron alumnos en este curso.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de Trayectoria Académica */}
            {selectedStudent && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass-card" style={{ width: '90%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Trayectoria Académica</h2>
                            <button onClick={() => setSelectedStudent(null)} className="btn btn-sm btn-danger">X</button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.4rem' }}>{selectedStudent.apellido}, {selectedStudent.nombre}</h3>
                            <p style={{ color: 'var(--text-dim)' }}>Legajo: {selectedStudent.legajo} | Curso Actual: {selectedStudent.curso}</p>
                        </div>

                        <h4 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Historial por Ciclos</h4>

                        {selectedStudent.Historial && selectedStudent.Historial.length > 0 ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {selectedStudent.Historial.map((h, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        borderLeft: h.condicion === 'aprobado' || h.condicion === 'promocionado' ? '4px solid #2ecc71' : '4px solid #e74c3c'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong>Ciclo {h.ciclo_lectivo}</strong>
                                            <span className={`badge ${h.condicion === 'promocionado' ? 'bg-success' : 'bg-warning'}`}>
                                                {h.condicion.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>Curso: <strong>{h.curso}</strong></div>
                                        {h.observaciones && <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>Obs: {h.observaciones}</div>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-4" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <p style={{ color: 'var(--text-dim)' }}>No hay historial de ciclos anteriores registrado.</p>
                                <small>El alumno se encuentra cursando su primer ciclo o no se han migrado datos históricos.</small>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                            <button className="btn btn-secondary" onClick={() => setSelectedStudent(null)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsManagement;
