import React, { useState, useEffect } from 'react';
import api from '../../api';
import { COURSES, SUBJECTS } from './constants';
import { useAuth } from '../../context/AuthContext';

const TeacherAssignment = () => {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Get all users to filter teachers
            const resUsers = await api.get('/users');
            // Filter only 'profesor' role
            const profs = resUsers.data.filter(u => u.role === 'profesor');
            setTeachers(profs);
            if (profs.length > 0 && !selectedTeacher) setSelectedTeacher(profs[0].email);

            // Get assignments
            const resAsig = await api.get('/profesor/asignaciones');
            setAssignments(resAsig.data);
        } catch (error) {
            console.error('Error fetching assignments data:', error);
        }
        setLoading(false);
    };

    const handleAssign = async () => {
        if (!selectedTeacher) return alert('Seleccione un profesor');

        // Prevent duplicate in frontend to save a call (optional, backend allows duplicates? Model doesn't enforcing unique logic yet but should)
        // Let's just call backend
        try {
            setLoading(true);
            await api.post('/admin/asignar-materia', {
                email_profesor: selectedTeacher,
                curso: selectedCourse,
                materia: selectedSubject
            });
            alert('Materia asignada correctamente');
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Error al asignar materia');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que desea eliminar esta asignación?')) return;
        try {
            setLoading(true);
            await api.delete(`/admin/asignar-materia/${id}`);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Error al eliminar asignación');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1 className="mb-4 text-center">Gestión de Docentes y Materias</h1>

            {/* CREATE CARD */}
            <div className="glass-card p-4 mb-5">
                <h3 className="mb-3">Asignar Nueva Materia</h3>
                <div className="d-flex gap-3 flex-wrap align-items-end">
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <label className="d-block mb-2">Profesor</label>
                        <select className="form-control" value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}>
                            <option value="">-- Seleccionar --</option>
                            {teachers.map(t => (
                                <option key={t.id} value={t.email}>{t.email}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ width: '150px' }}>
                        <label className="d-block mb-2">Curso</label>
                        <select className="form-control" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <label className="d-block mb-2">Materia</label>
                        <select className="form-control" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <button className="btn btn-primary" onClick={handleAssign} disabled={loading} style={{ height: '42px' }}>
                        {loading ? '...' : '➕ Asignar'}
                    </button>
                </div>
            </div>

            {/* LIST CARD */}
            <div className="glass-card p-4">
                <h3 className="mb-3">Asignaciones Vigentes</h3>
                <div className="table-responsive">
                    <table className="table" style={{ color: 'var(--text-primary)' }}>
                        <thead>
                            <tr>
                                <th>Profesor</th>
                                <th>Curso</th>
                                <th>Materia</th>
                                <th>Ciclo</th>
                                <th style={{ textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map(a => (
                                <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td>{a.email_profesor}</td>
                                    <td><span className="badge bg-secondary">{a.curso}</span></td>
                                    <td>{a.materia}</td>
                                    <td>{a.ciclo_lectivo}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {assignments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-4">No hay asignaciones registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherAssignment;
