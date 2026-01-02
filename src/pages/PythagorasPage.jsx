import React from 'react';
import PythagorasTheory from '../components/math/PythagorasTheory';
import PythagorasCalculator from '../components/math/PythagorasCalculator';

const PythagorasPage = () => {
    return (
        <div className="app-container">
            <h1>Teorema de Pitágoras</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Geometría Fundamental en Triángulos Rectángulos
            </p>

            <PythagorasTheory />
            <PythagorasCalculator />
        </div>
    );
};

export default PythagorasPage;
