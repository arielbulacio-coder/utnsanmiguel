import React from 'react';
import CaliperTheory from '../components/workshop/CaliperTheory';
import CaliperSimulator from '../components/workshop/CaliperSimulator';

const CaliperPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: El Calibre</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Medición de Precisión con Nonio
            </p>

            <CaliperTheory />
            <CaliperSimulator />
        </div>
    );
};

export default CaliperPage;
