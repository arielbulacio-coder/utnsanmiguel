import React from 'react';

const Attendance = () => {
    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Control de Asistencia</h1>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Tomar Asistencia</h2>
                    <span className="result-label">{new Date().toLocaleDateString()}</span>
                </div>

                <p>Seleccione un curso para comenzar a tomar asistencia.</p>

                <div className="input-group" style={{ marginTop: '1rem', maxWidth: '400px' }}>
                    <label>Curso</label>
                    <select style={{ padding: '0.875rem', borderRadius: '8px', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                        <option>Seleccionar...</option>
                        <option>6° A</option>
                        <option>5° B</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
