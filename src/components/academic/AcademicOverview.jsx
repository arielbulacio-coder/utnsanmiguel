import React from 'react';
import { Link } from 'react-router-dom';

const AcademicOverview = () => {
    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Gestión Académica</h1>
            <p className="intro-text">
                Bienvenido al módulo de Gestión Académica. Aquí podrás administrar estudiantes, calificaciones, asistencias y más.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '3rem' }}>
                <Link to="/estudiantes" className="glass-card" style={{ padding: '2rem', display: 'block', textDecoration: 'none' }}>
                    <h3>🎓 Estudiantes</h3>
                    <p>Gestión de matrícula, información personal y seguimiento académico.</p>
                </Link>

                <Link to="/calificaciones" className="glass-card" style={{ padding: '2rem', display: 'block', textDecoration: 'none' }}>
                    <h3>📊 Calificaciones</h3>
                    <p>Registro de notas, libros de temas y promedios.</p>
                </Link>

                <Link to="/asistencia" className="glass-card" style={{ padding: '2rem', display: 'block', textDecoration: 'none' }}>
                    <h3>📅 Asistencia</h3>
                    <p>Control de asistencia diaria y reportes.</p>
                </Link>

                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3>📋 Reportes</h3>
                    <p>Generación de informes académicos y estadísticos. (Próximamente)</p>
                </div>
            </div>
        </div>
    );
};

export default AcademicOverview;
