import React from 'react';
import ResistorTheory from '../components/resistor/ResistorTheory';
import ResistorCalculator from '../components/resistor/ResistorCalculator';

const ResistorPage = () => {
    return (
        <div className="app-container">
            <h1>Código de Colores</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Identificación de valor de resistencias
            </p>

            <ResistorTheory />
            <ResistorCalculator />
        </div>
    );
};

export default ResistorPage;
