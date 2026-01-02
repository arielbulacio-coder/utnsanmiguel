import React from 'react';
import ElectricalTools from '../components/workshop/ElectricalTools';

const ElectricalToolsPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Electricidad</h1>
            <p style={{ fontSize: '1.2rem', color: '#eab308', marginBottom: '3rem' }}>
                Instalaciones y Herramientas Eléctricas
            </p>
            <ElectricalTools />
        </div>
    );
};

export default ElectricalToolsPage;
