import React from 'react';
import PowerTheory from '../components/PowerTheory';
import PowerCalculator from '../components/PowerCalculator';

const PowerPage = () => {
    return (
        <div className="app-container">
            <h1>Potencia Eléctrica</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Cálculo de Consumo y Disipación de Energía
            </p>

            <PowerTheory />
            <PowerCalculator />
        </div>
    );
};

export default PowerPage;
