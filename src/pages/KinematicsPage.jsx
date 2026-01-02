import React from 'react';
import KinematicsTheory from '../components/physics/KinematicsTheory';
import KinematicsCalculator from '../components/physics/KinematicsCalculator';

const KinematicsPage = () => {
    return (
        <div className="app-container">
            <h1>Física: Cinemática</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Estudio del Movimiento Rectilíneo (MRU y MRUV)
            </p>

            <KinematicsTheory />
            <KinematicsCalculator />
        </div>
    );
};

export default KinematicsPage;
