import React from 'react';
import ElectronicsTools from '../components/workshop/ElectronicsTools';

const ElectronicsToolsPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Electrónica</h1>
            <p style={{ fontSize: '1.2rem', color: '#a855f7', marginBottom: '3rem' }}>
                Laboratorio y Herramientas Especializadas
            </p>
            <ElectronicsTools />
        </div>
    );
};

export default ElectronicsToolsPage;
