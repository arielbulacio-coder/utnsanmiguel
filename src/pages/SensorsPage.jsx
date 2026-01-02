import React from 'react';
import SensorsTheory from '../components/arduino/SensorsTheory';

const SensorsPage = () => {
    return (
        <div className="app-container">
            <h1>Sensores para Arduino</h1>
            <p style={{ fontSize: '1.2rem', color: '#14b8a6', marginBottom: '3rem' }}>
                📡 Percibiendo el Mundo Físico
            </p>

            <SensorsTheory />
        </div>
    );
};

export default SensorsPage;
