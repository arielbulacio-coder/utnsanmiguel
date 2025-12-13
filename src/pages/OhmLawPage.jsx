import React from 'react';
import OhmTheory from '../components/OhmTheory';
import OhmSimulator from '../components/OhmSimulator';

const OhmLawPage = () => {
    return (
        <div className="app-container">
            <h1>Ley de Ohm</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Aprende y Simula los fundamentos de la electricidad
            </p>

            <OhmTheory />
            <OhmSimulator />
        </div>
    );
};

export default OhmLawPage;
