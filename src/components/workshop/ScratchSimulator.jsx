import React from 'react';

const ScratchSimulator = () => {
    return (
        <div className="glass-card section-container">
            <h2>Simulador / Editor de Scratch</h2>
            <p className="mb-3">
                Utiliza el siguiente editor para crear y probar tus propios proyectos de Scratch directamente en el navegador.
            </p>

            <div style={{ position: 'relative', width: '100%', height: '80vh', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--glass-border)' }}>
                <iframe
                    src="https://scratch.mit.edu/projects/editor/?tutorial=getStarted"
                    allowtransparency="true"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    style={{ background: '#fff' }}
                ></iframe>
            </div>
            <div className="mt-2 text-end">
                <small>Powered by Scratch (MIT Media Lab)</small>
            </div>
        </div>
    );
};

export default ScratchSimulator;
