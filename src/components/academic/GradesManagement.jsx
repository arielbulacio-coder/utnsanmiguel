import React, { useState } from 'react';

const GradesManagement = () => {
    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Calificaciones y Libro de Temas</h1>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <p>Módulo de carga de notas en desarrollo...</p>

                <div className="input-group" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                    <label>Seleccionar Curso</label>
                    <select style={{ marginBottom: '1rem', padding: '0.875rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                        <option>6° A</option>
                        <option>5° B</option>
                    </select>

                    <label>Seleccionar Materia</label>
                    <select style={{ padding: '0.875rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                        <option>Matemática</option>
                        <option>Física</option>
                        <option>Taller</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default GradesManagement;
