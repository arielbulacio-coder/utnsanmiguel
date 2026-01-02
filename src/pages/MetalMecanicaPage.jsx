import React from 'react';
import MetalMecanicaTools from '../components/workshop/MetalMecanicaTools';

const MetalMecanicaPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Metal-Mecánica</h1>
            <p style={{ fontSize: '1.2rem', color: '#3b82f6', marginBottom: '3rem' }}>
                Ajuste Mecánico y Trabajo en Metales
            </p>
            <MetalMecanicaTools />
        </div>
    );
};

export default MetalMecanicaPage;
