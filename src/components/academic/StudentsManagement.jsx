import React, { useState, useEffect } from 'react';
import api from '../../api';
import { COURSES } from './constants';

const StudentsManagement = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showForm, setShowForm] = useState(false);

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
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email Alumno</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email Padre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}><span className="badge bg-secondary">{student.curso || '-'}</span></td>
                                        <td style={{ padding: '1rem' }}>{student.legajo}</td>
                                        <td style={{ padding: '1rem' }}>{student.apellido}, {student.nombre}</td>
                                        <td style={{ padding: '1rem' }}>{student.email}</td>
                                        <td style={{ padding: '1rem' }}>{student.email_padre}</td>
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
        </div>
    );
};

export default StudentsManagement;
