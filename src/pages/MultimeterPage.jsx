import React from 'react';
import MultimeterTheory from '../components/workshop/MultimeterTheory';
import MultimeterSimulator from '../components/workshop/MultimeterSimulator';

const MultimeterPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: El Multímetro</h1>
            <p style={{ fontSize: '1.2rem', color: '#eab308', marginBottom: '3rem' }}>
                Instrumento Esencial de Medición Eléctrica
            </p>

            <MultimeterTheory />
            <MultimeterSimulator />
        </div>
    );
};

export default MultimeterPage;
