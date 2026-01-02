import React from 'react';
import UnitTheory from '../components/units/UnitTheory';
import UnitConverter from '../components/units/UnitConverter';

const UnitConversionPage = () => {
    return (
        <div className="app-container">
            <h1>Conversión de Unidades</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Sistema Imperial y Sistema Métrico
            </p>

            <UnitTheory />
            <UnitConverter />
        </div>
    );
};

export default UnitConversionPage;
