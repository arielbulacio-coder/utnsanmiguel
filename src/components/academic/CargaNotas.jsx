import { useState } from 'react';
import axios from 'axios';

const CargaNotas = () => {
    const [nota, setNota] = useState({ alumno_id: '', materia_id: '', valor: '' });

    const enviarNota = async (e) => {
        e.preventDefault();
        try {
            // La URL vendrá de tu variable de entorno de Render
            await axios.post(`${import.meta.env.VITE_API_URL}/notas`, nota);
            alert("Nota cargada con éxito");
        } catch (error) {
            console.error("Error al cargar nota", error);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="mb-4 fw-bold">Cargar Calificación</h2>
            <form onSubmit={enviarNota} className="d-grid gap-3">
                <input
                    type="text" placeholder="ID Alumno"
                    className="form-control"
                    onChange={(e) => setNota({ ...nota, alumno_id: e.target.value })}
                />
                <input
                    type="number" placeholder="Nota (1-10)"
                    className="form-control"
                    onChange={(e) => setNota({ ...nota, valor: e.target.value })}
                />
                <button className="btn btn-primary">
                    Guardar Nota
                </button>
            </form>
        </div>
    );
};

export default CargaNotas;
