import React from 'react';
import KirchhoffTheory from '../components/kirchhoff/KirchhoffTheory';
import KirchhoffSimulator from '../components/kirchhoff/KirchhoffSimulator';

const KirchhoffPage = () => {
    return (
        <div className="app-container">
            <h1>Leyes de Kirchhoff</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '3rem' }}>
                Análisis de circuitos: Mallas y Nodos
            </p>

            <KirchhoffTheory />
            <KirchhoffSimulator />
        </div>
    );
};

export default KirchhoffPage;
