import React from 'react';

const ConstructionPage = ({ title }) => {
    return (
        <div className="app-container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>{title}</h1>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ color: 'var(--secondary-color)' }}>Próximamente</h2>
                <p>Este módulo se encuentra en desarrollo.</p>
                <p>Pronto podrás acceder a esta herramienta.</p>
                <div style={{ fontSize: '3rem', marginTop: '1rem' }}>🚧</div>
            </div>
        </div>
    );
};

export default ConstructionPage;
