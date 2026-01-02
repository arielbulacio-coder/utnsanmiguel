import React from 'react';
import TrigonometryTheory from '../components/math/TrigonometryTheory';
import TrigonometryCalculator from '../components/math/TrigonometryCalculator';

const TrigonometryPage = () => {
    return (
        <div className="app-container">
            <h1>Trigonometría</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Razones Trigonométricas en Triángulos Rectángulos
            </p>

            <TrigonometryTheory />
            <TrigonometryCalculator />
        </div>
    );
};

export default TrigonometryPage;
