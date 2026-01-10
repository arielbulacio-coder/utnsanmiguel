import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const CourseSubjectManager = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resC, resS] = await Promise.all([
                api.get('/cursos'),
                api.get('/materias')
            ]);
            setCourses(resC.data);
            setSubjects(resS.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newCourse.trim()) return;
        setLoading(true);
        try {
            await api.post('/cursos', { nombre: newCourse });
            setNewCourse('');
            fetchData();
        } catch (error) {
            alert('Error al crear curso: ' + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm('¿Eliminar curso?')) return;
        try {
            await api.delete(`/cursos/${id}`);
            fetchData();
        } catch (error) {
            alert('Error eliminando curso');
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!newSubject.trim()) return;
        setLoading(true);
        try {
            await api.post('/materias', { nombre: newSubject });
            setNewSubject('');
            fetchData();
        } catch (error) {
            alert('Error al crear materia');
        }
        setLoading(false);
    };

    const handleDeleteSubject = async (id) => {
        if (!window.confirm('¿Eliminar materia?')) return;
        try {
            await api.delete(`/materias/${id}`);
            fetchData();
        } catch (error) {
            alert('Error eliminando materia');
        }
    };

    if (!['admin', 'director', 'secretario'].includes(user?.role)) {
        return <div className="p-4 text-center">Acceso Denegado</div>;
    }

    return (
        <div className="container p-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="text-center mb-5">Gestión de Oferta Académica</h1>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="glass-card p-4 h-100">
                        <h3 className="mb-3 border-bottom pb-2">📚 Cursos / Divisiones</h3>
                        <ul className="list-group mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {courses.map(c => (
                                <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white border-secondary">
                                    {c.nombre}
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCourse(c.id)}>✕</button>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={handleAddCourse} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nuevo curso (ej: 7o 1a)"
                                value={newCourse}
                                onChange={e => setNewCourse(e.target.value)}
                            />
                            <button className="btn btn-success" disabled={loading}>+</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="glass-card p-4 h-100">
                        <h3 className="mb-3 border-bottom pb-2">📝 Materias</h3>
                        <ul className="list-group mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {subjects.map(s => (
                                <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white border-secondary">
                                    {s.nombre}
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteSubject(s.id)}>✕</button>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={handleAddSubject} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nueva materia"
                                value={newSubject}
                                onChange={e => setNewSubject(e.target.value)}
                            />
                            <button className="btn btn-success" disabled={loading}>+</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSubjectManager;
