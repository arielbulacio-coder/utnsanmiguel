import React, { useState } from 'react';
import api from '../../api';

const RegistroAlumno = () => {
    const [alumno, setAlumno] = useState({
        nombre: '',
        apellido: '',
        email: '',
        legajo: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/alumnos', alumno);
            alert('Alumno guardado con éxito!');
            console.log(response.data);
            // Optional: Clear form after success
            setAlumno({ nombre: '', apellido: '', email: '', legajo: '' });
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Hubo un error al conectar con el servidor');
        }
    };

    return (
        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', margin: '2rem auto', backgroundColor: 'var(--card-bg, #fff)' }}>
            <h2 className="h4 font-weight-bold mb-4 text-center">Registrar Nuevo Alumno</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="Nombre"
                        value={alumno.nombre}
                        onChange={e => setAlumno({ ...alumno, nombre: e.target.value })}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="Apellido"
                        value={alumno.apellido}
                        onChange={e => setAlumno({ ...alumno, apellido: e.target.value })}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        value={alumno.email}
                        onChange={e => setAlumno({ ...alumno, email: e.target.value })}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        className="form-control"
                        placeholder="Legajo"
                        value={alumno.legajo}
                        onChange={e => setAlumno({ ...alumno, legajo: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-success mt-2">
                    Guardar en Base de Datos
                </button>
            </form>
        </div>
    );
};

export default RegistroAlumno;
