import React from 'react';
import MicrometerTheory from '../components/workshop/MicrometerTheory';
import MicrometerSimulator from '../components/workshop/MicrometerSimulator';

const MicrometerPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: El Micrómetro</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Instrumentos de Medición de Alta Precisión
            </p>

            <MicrometerTheory />
            <MicrometerSimulator />
        </div>
    );
};

export default MicrometerPage;
