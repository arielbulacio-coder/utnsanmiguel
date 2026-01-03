import { useState } from 'react';
import api from '../api'; // Importamos la instancia que creamos

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
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Hubo un error al conectar con el servidor');
        }
    };

    return (
        <div className="container mt-4 p-4 bg-white shadow rounded" style={{ maxWidth: '500px', color: '#000' }}>
            <h2 className="mb-4 fw-bold">Registrar Nuevo Alumno</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <input
                    className="form-control"
                    placeholder="Nombre"
                    value={alumno.nombre}
                    onChange={e => setAlumno({ ...alumno, nombre: e.target.value })}
                />
                <input
                    className="form-control"
                    placeholder="Apellido"
                    value={alumno.apellido}
                    onChange={e => setAlumno({ ...alumno, apellido: e.target.value })}
                />
                <input
                    className="form-control"
                    placeholder="Email"
                    value={alumno.email}
                    onChange={e => setAlumno({ ...alumno, email: e.target.value })}
                />
                <input
                    className="form-control"
                    placeholder="Legajo"
                    value={alumno.legajo}
                    onChange={e => setAlumno({ ...alumno, legajo: e.target.value })}
                />
                <button className="btn btn-success text-white">
                    Guardar en Base de Datos
                </button>
            </form>
        </div>
    );
};

export default RegistroAlumno;
