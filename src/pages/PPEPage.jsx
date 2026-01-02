import React from 'react';
import PPESection from '../components/workshop/PPESection';

const PPEPage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Seguridad e Higiene</h1>
            <p style={{ fontSize: '1.2rem', color: '#ef4444', marginBottom: '3rem', fontWeight: 'bold' }}>
                Protección Personal y Normas de Seguridad
            </p>

            <PPESection />

            <div className="glass-card section-container" style={{ marginTop: '2rem', textAlign: 'left' }}>
                <h2>Normas Generales de Conducta</h2>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>No correr dentro del taller.</li>
                    <li>Mantener el área de trabajo limpia y libre de obstáculos.</li>
                    <li>No utilizar máquinas sin la autorización y supervisión del docente.</li>
                    <li>Informar cualquier avería o mal funcionamiento de las herramientas de inmediato.</li>
                    <li>El cabello largo debe estar recogido y no se permite el uso de bufandas, cadenas o ropa suelta cerca de máquinas rotativas.</li>
                </ul>
            </div>
        </div>
    );
};

export default PPEPage;
