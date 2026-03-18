import React from 'react';
import './DrawingStyles.css';

const AxonometricPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Perspectivas Axonométricas</h1>
                <p>Representación tridimensional en un plano bidimensional.</p>
            </header>

            <div className="drawing-grid">
                <section className="drawing-card">
                    <h2>Perspectiva Isométrica</h2>
                    <p>
                        Los tres ejes forman ángulos de 120° entre sí (o 30° respecto a la horizontal). Las dimensiones no se reducen en ninguno de los ejes.
                    </p>
                    <div className="isometric-demo">
                        <svg viewBox="0 0 100 80" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                            <path d="M50 10 L80 27.3 L80 57.3 L50 40 L20 57.3 L20 27.3 Z" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                            <line x1="50" y1="40" x2="50" y2="70" stroke="var(--primary-color)" strokeWidth="1" />
                            <line x1="50" y1="10" x2="50" y2="40" stroke="var(--primary-color)" strokeWidth="1" />
                            <line x1="80" y1="27.3" x2="50" y2="10" stroke="var(--primary-color)" strokeWidth="1" />
                            <line x1="20" y1="27.3" x2="50" y2="10" stroke="var(--primary-color)" strokeWidth="1" />
                        </svg>
                        <div className="info-box">
                            <strong>Ángulos:</strong> Los ejes X e Y están a 30° de la horizontal. El eje Z es vertical.
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Perspectiva Caballera</h2>
                    <p>
                        Dos ejes están a 90°. El tercer eje (profundidad) suele estar a 45°. Se aplica un coeficiente de reducción (C.R. = 0.5) para que no se vea deformada.
                    </p>
                    <div className="cavalier-demo">
                        <svg viewBox="0 0 100 80" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                            <rect x="20" y="30" width="40" height="40" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                            <line x1="60" y1="30" x2="80" y2="10" stroke="var(--secondary-color)" strokeWidth="1" />
                            <line x1="60" y1="70" x2="80" y2="50" stroke="var(--secondary-color)" strokeWidth="1" />
                            <line x1="20" y1="30" x2="40" y2="10" stroke="var(--secondary-color)" strokeWidth="1" />
                            <line x1="80" y1="10" x2="80" y2="50" stroke="var(--secondary-color)" strokeWidth="1" />
                            <line x1="40" y1="10" x2="80" y2="10" stroke="var(--secondary-color)" strokeWidth="1" />
                        </svg>
                        <div className="info-box">
                            <strong>Eje Z:</strong> A 45° respecto a la horizontal. La dimensión real se divide a la mitad en el plano inclinado.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AxonometricPage;
