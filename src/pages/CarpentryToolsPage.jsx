import React from 'react';
import CarpentryToolsTheory from '../components/workshop/CarpentryToolsTheory';

const CarpentryToolsPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Herramientas de Carpintería</h1>
            <p style={{ fontSize: '1.2rem', color: '#bc6c25', marginBottom: '3rem' }}>
                Conocimiento y Uso de Herramientas Manuales
            </p>

            <CarpentryToolsTheory />

            <div className="glass-card section-container" style={{ marginTop: '2rem', textAlign: 'left' }}>
                <h2>Seguridad con Herramientas Manuales</h2>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>Verifique que los mangos estén firmes y sin astillas.</li>
                    <li>Mantenga siempre el filo de corte opuesto a su mano de apoyo.</li>
                    <li>Utilice la herramienta adecuada para cada tarea (no use un formón como destornillador).</li>
                    <li>Guarde las herramientas en un lugar seco y ordenado para evitar accidentes al tomarlas.</li>
                </ul>
            </div>
        </div>
    );
};

export default CarpentryToolsPage;
