import React, { useState } from 'react';

const StudentsManagement = () => {
    const [students] = useState([
        { id: 1, name: 'Juan Pérez', course: '6° A', email: 'juan.perez@escuela.edu' },
        { id: 2, name: 'Maria Gomez', course: '6° A', email: 'maria.gomez@escuela.edu' },
        { id: 3, name: 'Carlos Lopez', course: '5° B', email: 'carlos.lopez@escuela.edu' },
    ]);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Gestión de Estudiantes</h1>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Listado de Alumnos</h2>
                    <button className="mode-btn active"> + Nuevo Estudiante</button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Nombre</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Curso</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td style={{ padding: '1rem' }}>{student.id}</td>
                                    <td style={{ padding: '1rem' }}>{student.name}</td>
                                    <td style={{ padding: '1rem' }}>{student.course}</td>
                                    <td style={{ padding: '1rem' }}>{student.email}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <button style={{ marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✏️</button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentsManagement;
