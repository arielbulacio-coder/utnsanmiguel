import React from 'react';
import OscilloscopeTheory from '../components/workshop/OscilloscopeTheory';
import OscilloscopeSimulator from '../components/workshop/OscilloscopeSimulator';

const OscilloscopePage = () => {
    return (
        <div className="app-container">
            <h1>Taller: El Osciloscopio</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Instrumentación y Visualización de Señales
            </p>

            <OscilloscopeTheory />
            <OscilloscopeSimulator />
        </div>
    );
};

export default OscilloscopePage;
